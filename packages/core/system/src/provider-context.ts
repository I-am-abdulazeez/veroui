/**
 * Provider Context Types
 * We use provide/inject in Vue to pass down global configuration to all components.
 */

import type { InjectionKey, App, ComputedRef } from 'vue'
import type { SpinnerVariants, Calendar, DateValue, CalendarIdentifier } from './types'

export interface ProviderContextProps {
  /**
   * Whether to disable animations in the whole application.
   *
   * @default false
   */
  disableAnimation?: boolean

  /**
  * Position where the label should appear.
  *
  * @default undefined
  */
  labelPlacement?: 'inside' | 'outside' | 'outside-left'

  /**
   * Whether to disable the ripple effect in the whole application.
   * If `disableAnimation` is set to `true`, this prop will be ignored.
   *
   * @default false
   */
  disableRipple?: boolean

  /**
  * Whether to use native HTML form validation to prevent form submission
  * when the value is missing or invalid, or mark the field as required
  * or invalid via ARIA.
  *
  * @default undefined
  */
  validationBehavior?: 'aria' | 'native'

  /**
   * The default dates range that can be selected in the calendar.
   */
  defaultDates?: {
    /**
     * The minimum date that can be selected in the calendar.
     *
     * @default CalendarDate(1900, 1, 1)
     */
    minDate?: DateValue

    /**
     * The maximum date that can be selected in the calendar.
     *
     * @default CalendarDate(2099, 12, 31)
     */
    maxDate?: DateValue
  }

  /**
  * This function helps to reduce the bundle size by providing a custom calendar system.
  *
  * @example
  * ```ts
  * import { GregorianCalendar } from '@internationalized/date'
  *
  * function createCalendar(identifier: string) {
  *   switch (identifier) {
  *     case 'gregory':
  *       return new GregorianCalendar()
  *     default:
  *       throw new Error(`Unsupported calendar ${identifier}`)
  *   }
  * }
  * ```
  *
  * @default all calendars
  */
  createCalendar?: (identifier: CalendarIdentifier) => Calendar

  /**
   * The default variant of the spinner.
   * @default default
   */
  spinnerVariant?: SpinnerVariants
}

// Create injection key for type safety
export const VEROUI_PROVIDER_KEY: InjectionKey<ComputedRef<ProviderContextProps>> = Symbol('veroui-provider')

// Default values
export const defaultProviderContext: ProviderContextProps = {
  disableAnimation: false,
  disableRipple: false,
  labelPlacement: undefined,
  validationBehavior: undefined,
  spinnerVariant: 'default',
}
