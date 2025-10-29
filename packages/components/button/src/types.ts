import type { UseButtonProps } from './use-button'
import type { UseButtonGroupProps } from './use-button-group'

export interface ButtonProps extends /* @vue-ignore */ UseButtonProps {
  /**
 * Button content (default slot will be used if not provided)
 */
  children?: any;
}
export interface ButtonGroupProps extends /* @vue-ignore */ UseButtonGroupProps { }

export type SpinnerPlacement = 'start' | 'end';
export type Size = 'sm' | 'md' | 'lg'
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type Variant = "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost"
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
