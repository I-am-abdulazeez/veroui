import { inject, provide, type InjectionKey, type ComputedRef } from 'vue'
import type { ButtonProps } from './types'

export type ButtonGroupContext = {
  size?: ButtonProps['size']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  radius?: ButtonProps['radius']
  isDisabled?: ButtonProps['isDisabled']
  disableAnimation?: ButtonProps['disableAnimation']
  disableRipple?: ButtonProps['disableRipple']
  isIconOnly?: ButtonProps['isIconOnly']
  fullWidth?: boolean
}

export const ButtonGroupContextKey: InjectionKey<ComputedRef<ButtonGroupContext>> =
  Symbol('ButtonGroupContext')

export function provideButtonGroupContext(context: ComputedRef<ButtonGroupContext>) {
  provide(ButtonGroupContextKey, context)
}

// Return the ref itself, not the value
export function useButtonGroupContext(): ComputedRef<ButtonGroupContext> | undefined {
  return inject(ButtonGroupContextKey, undefined)
}
