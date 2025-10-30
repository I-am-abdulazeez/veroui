import { Component, computed, ref, VNode } from 'vue'
import { button, type ButtonVariantProps } from '@veroui/theme'
import { dataAttr } from '@veroui/shared-utils'
import { useProviderContext } from '@veroui/system'
import { useButtonGroupContext } from './button-group-context'
import type { Color, Radius, Size, SpinnerPlacement, Variant } from './types'

// Import Spinner and Ripple components
import { Spinner } from '@veroui/spinner'
import { Ripple, type RippleType } from '@veroui/ripple'

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
  spinnerPlacement?: SpinnerPlacement
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
  size?: Size
  /**
   * The button color.
   * @default 'default'
   */
  color?: Color
  /**
   * The button variant.
   * @default 'solid'
   */
  variant?: Variant
  /**
   * The button radius.
   */
  radius?: Radius
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
  const groupContextRef = useButtonGroupContext()
  const globalContext = useProviderContext()
  const isInGroup = computed(() => !!groupContextRef?.value)
  const buttonRef = ref<HTMLButtonElement | null>(null)

  // Focus state management
  const isFocused = ref(false)
  const isFocusVisible = ref(false)
  const isPressed = ref(false)
  const isHovered = ref(false)

  // Ripple state
  const ripples = ref<RippleType[]>([])

  // Access groupContextRef.value reactively
  const size = computed(() => props.size ?? groupContextRef?.value?.size ?? 'md')
  const color = computed(() => props.color ?? groupContextRef?.value?.color ?? 'default')
  const variant = computed(() => props.variant ?? groupContextRef?.value?.variant ?? 'solid')
  const radius = computed(() => props.radius ?? groupContextRef?.value?.radius)
  const fullWidth = computed(() => props.fullWidth ?? groupContextRef?.value?.fullWidth ?? false)
  const isIconOnly = computed(() => props.isIconOnly ?? groupContextRef?.value?.isIconOnly ?? false)
  const disableAnimation = computed(() => {
    return props.disableAnimation ??
      groupContextRef?.value?.disableAnimation ??
      globalContext?.value?.disableAnimation ??
      false
  })
  const isLoading = computed(() => props.isLoading ?? false)
  const isDisabled = computed(() => (props.isDisabled ?? groupContextRef?.value?.isDisabled ?? false) || isLoading.value)

  const Component = computed(() => props.as || 'button')

  // Ripple should be enabled by default, disabled if explicitly set or if animations are disabled
  const disableRipple = computed(() => {
    return props.disableRipple ??
      globalContext?.value.disableRipple ??
      disableAnimation.value
  })

  const spinnerPlacement = computed(() => props.spinnerPlacement ?? 'start')

  // Compute spinner size based on button size
  const spinnerSize = computed(() => {
    const sizeMap: Record<string, 'sm' | 'md' | 'lg'> = {
      sm: 'sm',
      md: 'sm',
      lg: 'md',
    }
    return sizeMap[size.value] || 'sm'
  })

  // Get spinner component (allow custom spinner via props or use default)
  const getSpinner = computed(() => props.spinner || Spinner)

  const styles = computed(() => {
    const config = {
      size: size.value,
      color: color.value,
      variant: variant.value,
      radius: radius.value,
      fullWidth: fullWidth.value,
      isDisabled: isDisabled.value,
      isInGroup: isInGroup.value,
      disableAnimation: disableAnimation.value,
      isIconOnly: isIconOnly.value,
      className: props.className,
    }

    const result = button(config)
    return result
  })

  // Ripple handlers
  const onRipplePress = (e: MouseEvent) => {
    if (disableRipple.value || isDisabled.value || disableAnimation.value) return

    const button = buttonRef.value
    if (!button) return

    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const key = `${Date.now()}-${Math.random()}`
    ripples.value = [...ripples.value, { key, x, y, size }]
  }

  const onClearRipple = (key: string) => {
    ripples.value = ripples.value.filter(r => r.key !== key)
  }

  // Event handlers
  const handlePress = (e: MouseEvent) => {
    if (isDisabled.value) return

    isPressed.value = true
    onRipplePress(e)
    props.onPress?.(e)
    props.onClick?.(e)

    setTimeout(() => {
      isPressed.value = false
    }, 100)
  }

  const handleFocus = () => {
    isFocused.value = true
    isFocusVisible.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
    isFocusVisible.value = false
  }

  const handleMouseEnter = () => {
    if (!isDisabled.value) {
      isHovered.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
  }

  // Button props
  const buttonProps = computed(() => ({
    ref: buttonRef,
    type: Component.value === 'button' ? (props.type ?? 'button') : undefined,
    tabindex: isDisabled.value ? undefined : 0,
    class: styles.value,
    disabled: isDisabled.value,
    'data-disabled': dataAttr(isDisabled.value),
    'data-focus': dataAttr(isFocused.value),
    'data-pressed': dataAttr(isPressed.value),
    'data-focus-visible': dataAttr(isFocusVisible.value),
    'data-hover': dataAttr(isHovered.value),
    'data-loading': dataAttr(isLoading.value),
    onClick: handlePress,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
  }))

  // Ripple props
  const getRippleProps = computed(() => ({
    component: Ripple,
    props: {
      ripples: ripples.value,
      onClear: onClearRipple,
    }
  }))

  return {
    Component,
    buttonRef,
    styles,
    startContent: computed(() => props.startContent),
    endContent: computed(() => props.endContent),
    isLoading,
    spinnerSize,
    spinnerPlacement,
    disableRipple,
    getSpinner,
    buttonProps,
    ripples,
    onClearRipple,
    getRippleProps,
    isIconOnly,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
