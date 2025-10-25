import { ref, computed, type Ref } from 'vue'
import { usePress, type UsePressProps } from './use-press'

export interface AriaLinkOptions extends UsePressProps {
  /** The URL that the link points to. */
  href?: string
  /** The target window for the link. */
  target?: string
  /** The relationship between the linked resource and the current page. */
  rel?: string
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean
  /** Whether the link is disabled. */
  isDisabled?: boolean
  /**
   * The HTML element used to render the link, e.g. 'a', or 'span'.
   * @default 'a'
   */
  elementType?: string
  /** Handler for click events. */
  onClick?: (e: MouseEvent) => void
  /** Handler called when link is pressed using keyboard or mouse. */
  onPress?: (e: PointerEvent) => void
  /** Handler called when a press interaction starts. */
  onPressStart?: (e: PointerEvent) => void
  /** Handler called when a press interaction ends. */
  onPressEnd?: (e: PointerEvent) => void
}

export interface LinkAria {
  /** Props for the link element. */
  linkProps: Record<string, any>
  /** Whether the link is currently pressed. */
  isPressed: Ref<boolean>
}

/**
 * Provides the behavior and accessibility implementation for a link component.
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useAriaLink } from '@veroui/composables'
 *
 * const linkRef = ref<HTMLElement>()
 * const { linkProps, isPressed } = useAriaLink({
 *   href: '/about',
 *   onPress: () => console.log('Link pressed!')
 * }, linkRef)
 * </script>
 *
 * <template>
 *   <a ref="linkRef" v-bind="linkProps" :class="{ 'pressed': isPressed }">
 *     About
 *   </a>
 * </template>
 * ```
 */
export function useAriaLink(
  props: AriaLinkOptions,
  elementRef: Ref<HTMLElement | null>
): LinkAria {
  const {
    elementType = 'a',
    href,
    target,
    rel,
    isDisabled,
    onClick,
    onPress,
    onPressStart,
    onPressEnd,
    'aria-current': ariaCurrent,
  } = props

  // Use press interactions
  const { pressProps, isPressed } = usePress({
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
  }, elementRef)

  // Build link props
  const linkProps = computed(() => {
    const baseProps: Record<string, any> = {
      ...pressProps.value,
    }

    // Add role and tabindex for non-anchor elements
    if (elementType !== 'a') {
      baseProps.role = 'link'
      baseProps.tabIndex = !isDisabled ? 0 : undefined
    }

    // Add href and related attributes for anchor elements
    if (elementType === 'a') {
      baseProps.href = isDisabled ? undefined : href
      baseProps.target = target
      baseProps.rel = target === '_blank' && !rel ? 'noopener noreferrer' : rel
    }

    // Add ARIA attributes
    baseProps['aria-disabled'] = isDisabled || undefined
    baseProps['aria-current'] = ariaCurrent

    // Handle click events
    baseProps.onClick = (e: MouseEvent) => {
      // Call user's onClick handler
      onClick?.(e)

      // For anchor tags, let browser handle navigation unless prevented
      if (elementType === 'a' && !isDisabled) {
        // If it's an external link or has target, let it through
        if (target || !href || href.startsWith('http') || href.startsWith('//')) {
          return
        }

        // For internal links, you might want to use vue-router
        // This is where you'd integrate with router if needed
        // e.g., if (router) { e.preventDefault(); router.push(href) }
      }
    }

    // Keyboard handler for non-anchor elements
    if (elementType !== 'a') {
      baseProps.onKeydown = (e: KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
          e.preventDefault()

          // Trigger press event
          const pressEvent = new PointerEvent('click', {
            bubbles: true,
            cancelable: true,
          })
          onPress?.(pressEvent)
        }
      }
    }

    return baseProps
  })

  return {
    linkProps: linkProps.value,
    isPressed,
  }
}

export type UseAriaLinkReturn = ReturnType<typeof useAriaLink>
