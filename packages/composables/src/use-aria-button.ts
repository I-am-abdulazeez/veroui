import { computed, type Ref } from 'vue'
import { usePress, type UsePressProps } from './use-press'

export interface AriaButtonProps extends UsePressProps {
  /** The HTML element type for the button. */
  elementType?: 'button' | 'a' | 'div' | 'span' | 'input'
  /** Whether the button is disabled. */
  isDisabled?: boolean
  /** The type attribute for button elements. */
  type?: 'button' | 'submit' | 'reset'
  /** The href for link buttons. */
  href?: string
  /** The target for link buttons. */
  target?: string
  /** The rel attribute for link buttons. */
  rel?: string
  /** The role attribute. */
  role?: string
  /** Whether text selection should be enabled on the pressable element. */
  allowTextSelectionOnPress?: boolean
  /** Indicates a popup will be displayed. */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  /** Whether the popup is currently displayed. */
  'aria-expanded'?: boolean | 'true' | 'false'
  /** The element controlled by this button. */
  'aria-controls'?: string
  /** Indicates the pressed state for toggle buttons. */
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed'
  /** Indicates the current item in a set. */
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean
}

export interface ButtonAria {
  /** Props for the button element. */
  buttonProps: Record<string, any>
  /** Whether the button is currently pressed. */
  isPressed: Ref<boolean>
}

/**
 * Provides the behavior and accessibility implementation for a button component.
 * Handles mouse, keyboard, and touch interactions, focus behavior, and ARIA props
 * for both native button elements and custom element types.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useAriaButton } from '@veroui/composables'
 *
 * const buttonRef = ref<HTMLElement>()
 * const { buttonProps, isPressed } = useAriaButton({
 *   onPress: () => console.log('Button pressed!')
 * }, buttonRef)
 * </script>
 *
 * <template>
 *   <button ref="buttonRef" v-bind="buttonProps">
 *     Click me
 *   </button>
 * </template>
 * ```
 */
export function useAriaButton(
  props: AriaButtonProps,
  elementRef: Ref<HTMLElement | null>
): ButtonAria {
  const {
    elementType = 'button',
    isDisabled = false,
    type = 'button',
    href,
    target,
    rel,
    role,
    allowTextSelectionOnPress,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    'aria-haspopup': ariaHasPopup,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-pressed': ariaPressed,
    'aria-current': ariaCurrent,
  } = props

  // Use press interactions
  const { pressProps, isPressed } = usePress({
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
  }, elementRef)

  // Build button props based on element type
  const buttonProps = computed(() => {
    const baseProps: Record<string, any> = {
      ...pressProps.value,
    }

    // Element-specific props
    if (elementType === 'button') {
      baseProps.type = type
      baseProps.disabled = isDisabled
    } else if (elementType === 'a') {
      baseProps.role = role || 'button'
      baseProps.href = !isDisabled ? href : undefined
      baseProps.target = target
      baseProps.rel = rel || (target === '_blank' ? 'noopener noreferrer' : undefined)
      baseProps['aria-disabled'] = isDisabled || undefined
      baseProps.tabIndex = isDisabled ? -1 : 0
    } else if (elementType === 'input') {
      baseProps.type = type
      baseProps.disabled = isDisabled
    } else {
      // div, span, or other custom elements
      baseProps.role = role || 'button'
      baseProps.tabIndex = isDisabled ? -1 : 0
      baseProps['aria-disabled'] = isDisabled || undefined
    }

    // ARIA attributes
    if (ariaHasPopup !== undefined) baseProps['aria-haspopup'] = ariaHasPopup
    if (ariaExpanded !== undefined) baseProps['aria-expanded'] = ariaExpanded
    if (ariaControls !== undefined) baseProps['aria-controls'] = ariaControls
    if (ariaPressed !== undefined) baseProps['aria-pressed'] = ariaPressed
    if (ariaCurrent !== undefined) baseProps['aria-current'] = ariaCurrent

    // Prevent text selection if needed
    if (!allowTextSelectionOnPress) {
      baseProps.style = {
        ...baseProps.style,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }
    }

    return baseProps
  })

  return {
    buttonProps: buttonProps.value,
    isPressed,
  }
}

export type UseAriaButtonReturn = ReturnType<typeof useAriaButton>
