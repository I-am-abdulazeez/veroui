import { inject, provide, type InjectionKey } from 'vue'
import type { ButtonProps } from './button.vue'

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

export const ButtonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('ButtonGroupContext')

export function provideButtonGroupContext(context: ButtonGroupContext) {
  provide(ButtonGroupContextKey, context)
}

export function useButtonGroupContext(): ButtonGroupContext | undefined {
  return inject(ButtonGroupContextKey, undefined)
}
