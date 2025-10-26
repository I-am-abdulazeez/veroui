import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseAriaOverlayProps {
  /**
   * When `true`, `click/focus` interactions will be disabled on elements outside
   * the `Overlay`. Users need to click twice on outside elements to interact with them:
   * once to close the overlay, and again to trigger the element.
   *
   * @default true
   */
  disableOutsideEvents?: boolean
  /**
   * Whether the overlay can be dismissed by clicking outside or pressing escape
   * @default false
   */
  isDismissable?: boolean
  /**
   * Whether pressing the escape key should be disabled for dismissing the overlay
   * @default false
   */
  isKeyboardDismissDisabled?: boolean
  /**
   * Whether the overlay is currently open
   */
  isOpen?: boolean
  /**
   * Callback fired when the overlay should close
   */
  onClose?: () => void
  /**
   * Whether the overlay should close when focus moves outside
   */
  shouldCloseOnBlur?: boolean
  /**
   * Function to determine if clicking outside should close the overlay
   * @param target - The element that was clicked
   * @returns Whether the overlay should close
   */
  shouldCloseOnInteractOutside?: (target: Element) => boolean
}

export interface OverlayAria {
  overlayProps: Record<string, any>
  underlayProps: Record<string, any>
}

const visibleOverlays: Ref<Element | null>[] = []

/**
 * Determines the interaction type for overlay dismissal based on the element's ARIA role.
 * @param elementRef - Reference to the overlay element
 * @returns "pressEnd" for dialogs (close on release), "pressStart" for menus (close on press), or "unknown"
 */
function getOverlayInteractionType(
  elementRef: Ref<Element | null>
): 'pressEnd' | 'pressStart' | 'unknown' {
  const el = elementRef.value

  if (!el) return 'unknown'

  const role = (el.getAttribute('role') || '').toLowerCase()
  const ariaModalAttr = el.getAttribute('aria-modal')

  // Dialogs (Modal/Drawer) should close on press release.
  // Include alertdialog and treat missing aria-modal (unless explicitly "false") as modal.
  if (
    (role === 'dialog' || role === 'alertdialog') &&
    (ariaModalAttr === null || ariaModalAttr.toLowerCase() === 'true')
  ) {
    return 'pressEnd'
  }

  // Select-like/menu-like overlays typically close on press start.
  if (['listbox', 'menu', 'tree', 'grid', 'combobox'].includes(role)) {
    return 'pressStart'
  }

  return 'unknown'
}

/**
 * Provides the behavior for overlays such as dialogs, popovers, and menus.
 * Hides the overlay when the user interacts outside it, when the Escape key is pressed,
 * or optionally, on blur. Only the top-most overlay will close at once.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useAriaOverlay } from '@veroui/composables'
 *
 * const overlayRef = ref<HTMLElement>()
 * const isOpen = ref(false)
 *
 * const { overlayProps, underlayProps } = useAriaOverlay({
 *   isOpen: isOpen.value,
 *   isDismissable: true,
 *   onClose: () => { isOpen.value = false }
 * }, overlayRef)
 * </script>
 *
 * <template>
 *   <div v-if="isOpen">
 *     <div v-bind="underlayProps" class="overlay-backdrop" />
 *     <div ref="overlayRef" v-bind="overlayProps" role="dialog">
 *       Overlay content
 *     </div>
 *   </div>
 * </template>
 * ```
 */
export function useAriaOverlay(
  props: UseAriaOverlayProps,
  elementRef: Ref<Element | null>
): OverlayAria {
  const {
    disableOutsideEvents = true,
    isDismissable = false,
    isKeyboardDismissDisabled = false,
    isOpen,
    onClose,
    shouldCloseOnBlur,
    shouldCloseOnInteractOutside,
  } = props

  // Track if this overlay is in the visible stack
  const isInStack = ref(false)

  // Add/remove overlay from stack based on isOpen
  watch(
    () => isOpen,
    (open) => {
      if (open && !visibleOverlays.includes(elementRef)) {
        visibleOverlays.push(elementRef)
        isInStack.value = true
      } else if (!open && isInStack.value) {
        const index = visibleOverlays.indexOf(elementRef)
        if (index >= 0) {
          visibleOverlays.splice(index, 1)
        }
        isInStack.value = false
      }
    },
    { immediate: true }
  )

  // Only hide the overlay when it is the topmost visible overlay in the stack
  const onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === elementRef && onClose) {
      onClose()
    }
  }

  const onInteractOutsideStart = (e: PointerEvent) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target as Element)) {
      if (visibleOverlays[visibleOverlays.length - 1] === elementRef) {
        if (disableOutsideEvents) {
          e.stopPropagation()
          e.preventDefault()
        }
      }
      if (getOverlayInteractionType(elementRef) !== 'pressEnd') {
        onHide()
      }
    }
  }

  const onInteractOutside = (e: PointerEvent) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target as Element)) {
      if (visibleOverlays[visibleOverlays.length - 1] === elementRef) {
        if (disableOutsideEvents) {
          e.stopPropagation()
          e.preventDefault()
        }
      }
      onHide()
    }
  }

  // Handle the escape key
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !isKeyboardDismissDisabled && !e.isComposing) {
      e.stopPropagation()
      e.preventDefault()
      onHide()
    }
  }

  // Handle focus leaving the overlay
  const onFocusOut = (e: FocusEvent) => {
    if (!shouldCloseOnBlur) return

    const relatedTarget = e.relatedTarget as Element | null

    // Do not close if relatedTarget is null (focus lost to body)
    if (!relatedTarget) {
      return
    }

    // Check if focus is moving to a child element
    if (elementRef.value?.contains(relatedTarget)) {
      return
    }

    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(relatedTarget)) {
      onHide()
    }
  }

  // Handle clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element

    // Check if click is outside the overlay
    if (elementRef.value && !elementRef.value.contains(target)) {
      onInteractOutside(e as unknown as PointerEvent)
    }
  }

  const handlePointerDownOutside = (e: MouseEvent) => {
    const target = e.target as Element

    // Check if pointer down is outside the overlay
    if (elementRef.value && !elementRef.value.contains(target)) {
      onInteractOutsideStart(e as unknown as PointerEvent)
    }
  }

  // Set up event listeners
  onMounted(() => {
    if (isDismissable && isOpen) {
      document.addEventListener('pointerdown', handlePointerDownOutside, true)
      document.addEventListener('click', handleClickOutside, true)
    }
  })

  // Watch for changes to isDismissable and isOpen
  watch(
    () => [isDismissable, isOpen],
    ([newIsDismissable, newIsOpen]) => {
      if (newIsDismissable && newIsOpen) {
        document.addEventListener('pointerdown', handlePointerDownOutside, true)
        document.addEventListener('click', handleClickOutside, true)
      } else {
        document.removeEventListener('pointerdown', handlePointerDownOutside, true)
        document.removeEventListener('click', handleClickOutside, true)
      }
    }
  )

  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener('pointerdown', handlePointerDownOutside, true)
    document.removeEventListener('click', handleClickOutside, true)

    // Remove from stack
    const index = visibleOverlays.indexOf(elementRef)
    if (index >= 0) {
      visibleOverlays.splice(index, 1)
    }
  })

  const onPointerDownUnderlay = (e: PointerEvent) => {
    // fixes a firefox issue that starts text selection
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1675846
    if (e.target === e.currentTarget) {
      e.preventDefault()
    }
  }

  return {
    overlayProps: {
      onKeydown: onKeyDown,
      onFocusout: shouldCloseOnBlur ? onFocusOut : undefined,
    },
    underlayProps: {
      onPointerdown: onPointerDownUnderlay,
    },
  }
}

export type UseAriaOverlayReturn = ReturnType<typeof useAriaOverlay>
