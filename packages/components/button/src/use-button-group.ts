import { Component, computed, type Ref } from 'vue'
import { buttonGroup, type ButtonGroupVariantProps } from '@veroui/theme'
// import { objectToDeps } from '@veroui/shared-utils'
import type { ButtonProps } from './button.vue'
import type { ButtonGroupContext } from './button-group-context'

export interface UseButtonGroupProps extends ButtonGroupVariantProps {
  /**
   * The HTML element or component to render as.
   * @default 'div'
   */
  as?: string | Component
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps['isDisabled']
  /**
   * The size of all buttons in the group.
   * @default 'md'
   */
  size?: ButtonProps['size']
  /**
   * The color of all buttons in the group.
   * @default 'default'
   */
  color?: ButtonProps['color']
  /**
   * The radius of all buttons in the group.
   */
  radius?: ButtonProps['radius']
  /**
   * The variant of all buttons in the group.
   * @default 'solid'
   */
  variant?: ButtonProps['variant']
  /**
   * Whether all buttons are icon-only.
   * @default false
   */
  isIconOnly?: ButtonProps['isIconOnly']
  /**
   * Whether to disable animations.
   * @default false
   */
  disableAnimation?: ButtonProps['disableAnimation']
  /**
   * Whether to disable ripple effect.
   * @default false
   */
  disableRipple?: ButtonProps['disableRipple']
  /**
   * Custom class name.
   */
  className?: string
}

export function useButtonGroup(props: UseButtonGroupProps) {
  const {
    as = 'div',
    color = 'default',
    size = 'md',
    variant = 'solid',
    radius,
    isDisabled = false,
    isIconOnly = false,
    disableRipple = false,
    disableAnimation = false,
    fullWidth = false,
    className,
    ...variantProps
  } = props

  const Component = as

  // Compute class names
  const classNames = computed(() =>
    buttonGroup({
      ...variantProps,
      className,
    })
  )

  // Context to provide to child buttons
  const context = computed<ButtonGroupContext>(() => ({
    size,
    color,
    variant,
    radius,
    isIconOnly,
    isDisabled,
    disableAnimation,
    disableRipple,
    fullWidth,
  }))

  // Props to spread on the button group element
  const buttonGroupProps = computed(() => ({
    role: 'group',
    class: classNames.value,
  }))

  return {
    Component,
    context,
    classNames,
    buttonGroupProps,
  }
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>
