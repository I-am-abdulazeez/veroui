export type SpinnerVariant = 'default' | 'simple' | 'wave' | 'dots' | 'spinner' | 'gradient'
export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerColor = 'current' | 'white' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export type SpinnerSlots = 'base' | 'wrapper' | 'circle1' | 'circle2' | 'label' | 'dots' | 'spinnerBars'

export interface SpinnerProps {
  /**
   * The spinner size.
   * @default 'md'
   */
  size?: SpinnerSize
  /**
   * The spinner color.
   * @default 'primary'
   */
  color?: SpinnerColor
  /**
   * The spinner variant.
   * @default 'default'
   */
  variant?: SpinnerVariant
  /**
   * Spinner label, in case you passed it will be used as `aria-label`.
   */
  label?: string
  /**
   * Classname or List of classes to change the classNames of the element.
   */
  classNames?: Partial<Record<SpinnerSlots, string>>
  /**
   * Custom class name for the base element.
   */
  className?: string
}
