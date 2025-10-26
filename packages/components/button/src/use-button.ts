import { Component, computed, ref, type Ref, type VNode } from 'vue'
import { button, type ButtonVariantProps } from '@veroui/theme'
import { dataAttr, chain, mergeProps } from '@veroui/shared-utils'
import { useButtonGroupContext } from './button-group-context'
// import type { SpinnerProps } from '@veroui/spinner'

export interface UseButtonProps extends ButtonVariantProps {
  /**
   * The HTML element or component to render as.
   * @default 'button'
   */
  as?: string | Component
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean
  /**
   * The button start content (icon, etc).
   */
  startContent?: VNode | string
  /**
   * The button end content (icon, etc).
   */
  endContent?: VNode | string
  /**
   * Spinner to display when loading.
   */
  spinner?: VNode
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end'
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether the button is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the button should take full width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * The button size.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * The button color.
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /**
   * The button variant.
   * @default 'solid'
   */
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
  /**
   * The button radius.
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /**
   * Whether the button is icon only.
   * @default false
   */
  isIconOnly?: boolean
  /**
   * Whether to disable animations.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Custom class name.
   */
  className?: string
  /**
   * Auto focus on mount.
   * @default false
   */
  autoFocus?: boolean
  /**
   * Button type attribute.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Press event handler.
   */
  onPress?: (e: MouseEvent) => void
  /**
   * Click event handler (native).
   */
  onClick?: (e: MouseEvent) => void
}

export function useButton(props: UseButtonProps) {
  const groupContext = useButtonGroupContext()
  const isInGroup = !!groupContext

  const {
    as = 'button',
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus = false,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    fullWidth = groupContext?.fullWidth ?? false,
    radius = groupContext?.radius,
    size = groupContext?.size ?? 'md',
    color = groupContext?.color ?? 'default',
    variant = groupContext?.variant ?? 'solid',
    disableAnimation = groupContext?.disableAnimation ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    spinnerPlacement = 'start',
    type = 'button',
    onPress,
    onClick,
  } = props

  const Component = as || 'button'
  const buttonRef = ref<HTMLButtonElement | null>(null)

  const disableRipple = disableRippleProp ?? disableAnimation
  const isDisabled = isDisabledProp || isLoading

  // Focus state management
  const isFocused = ref(false)
  const isFocusVisible = ref(false)
  const isPressed = ref(false)
  const isHovered = ref(false)

  // Compute styles
  const styles = computed(() =>
    button({
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      disableAnimation,
      isIconOnly,
      className,
    })
  )

  // Ripple management
  const ripples = ref<any[]>([])

  const onRipplePress = (e: MouseEvent) => {
    if (disableRipple || isDisabled || disableAnimation) return

    const button = buttonRef.value
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripples.value.push({
      key: Date.now(),
      x,
      y,
      size: Math.max(rect.width, rect.height),
    })
  }

  const onClearRipple = (key: number) => {
    ripples.value = ripples.value.filter((ripple) => ripple.key !== key)
  }

  // Event handlers
  const handlePress = (e: MouseEvent) => {
    if (isDisabled) return

    isPressed.value = true
    onRipplePress(e)

    // Chain onPress and onClick
    onPress?.(e)
    onClick?.(e)

    // Reset pressed state after a short delay
    setTimeout(() => {
      isPressed.value = false
    }, 100)
  }

  const handleFocus = () => {
    isFocused.value = true
    // Simple focus-visible detection (keyboard navigation)
    isFocusVisible.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
    isFocusVisible.value = false
  }

  const handleMouseEnter = () => {
    if (!isDisabled) {
      isHovered.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
  }

  // Button props
  const buttonProps = computed(() => ({
    ref: buttonRef,
    type: Component === 'button' ? type : undefined,
    class: styles.value,
    disabled: isDisabled,
    'data-disabled': dataAttr(isDisabled),
    'data-focus': dataAttr(isFocused.value),
    'data-pressed': dataAttr(isPressed.value),
    'data-focus-visible': dataAttr(isFocusVisible.value),
    'data-hover': dataAttr(isHovered.value),
    'data-loading': dataAttr(isLoading),
    onClick: handlePress,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
  }))

  // Process icons
  const startContent = computed(() => startContentProp)
  const endContent = computed(() => endContentProp)

  // Spinner size based on button size
  // const spinnerSize = computed((): SpinnerProps['size'] => {
  //   const sizeMap: Record<string, SpinnerProps['size']> = {
  //     sm: 'sm',
  //     md: 'sm',
  //     lg: 'md',
  //   }
  //   return sizeMap[size]
  // })

  // Ripple props
  const rippleProps = computed(() => ({
    ripples: ripples.value,
    onClear: onClearRipple,
  }))

  return {
    Component,
    buttonRef,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    // spinnerSize,
    disableRipple,
    buttonProps,
    rippleProps,
    isIconOnly,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
