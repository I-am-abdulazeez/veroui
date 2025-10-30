import { Component, computed } from 'vue'
import { buttonGroup, type ButtonGroupVariantProps } from '@veroui/theme'
import type { ButtonProps } from './types'
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
  const Component = computed(() => props.as || 'div')

  const classNames = computed(() =>
    buttonGroup({
      fullWidth: props.fullWidth,
      className: props.className,
    })
  )

  const context = computed<ButtonGroupContext>(() => {
    const ctx = {
      size: props.size ?? 'md',
      color: props.color ?? 'default',
      variant: props.variant ?? 'solid',
      radius: props.radius,
      isIconOnly: props.isIconOnly ?? false,
      isDisabled: props.isDisabled ?? false,
      disableAnimation: props.disableAnimation ?? false,
      disableRipple: props.disableRipple ?? false,
      fullWidth: props.fullWidth ?? false,
    }

    return ctx
  })

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
