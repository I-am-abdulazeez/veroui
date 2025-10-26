import type { UseButtonProps } from './use-button'
import type { UseButtonGroupProps } from './use-button-group'

export interface ButtonProps extends /* @vue-ignore */ UseButtonProps {
  /**
 * Button content (default slot will be used if not provided)
 */
  children?: any;
}
export interface ButtonGroupProps extends /* @vue-ignore */ UseButtonGroupProps { }
