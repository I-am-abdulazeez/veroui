import { defineComponent, provide, computed, type PropType } from 'vue'
import { VEROUI_PROVIDER_KEY, type ProviderContextProps } from '../provider-context'
import type { Calendar, DateValue, CalendarIdentifier, SpinnerVariants } from '../types'

export interface VeroUIProviderProps extends ProviderContextProps {
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: string
}

export const VeroUIProvider = defineComponent({
  name: 'VeroUIProvider',
  props: {
    disableAnimation: {
      type: Boolean,
      default: false,
    },
    disableRipple: {
      type: Boolean,
      default: false,
    },
    labelPlacement: {
      type: String as PropType<'inside' | 'outside' | 'outside-left'>,
      default: undefined,
    },
    validationBehavior: {
      type: String as PropType<'aria' | 'native'>,
      default: undefined,
    },
    defaultDates: {
      type: Object as PropType<{
        minDate?: DateValue
        maxDate?: DateValue
      }>,
      default: undefined,
    },
    createCalendar: {
      type: Function as PropType<(identifier: CalendarIdentifier) => Calendar>,
      default: undefined,
    },
    spinnerVariant: {
      type: String as PropType<SpinnerVariants>,
      default: 'default',
    },
    locale: {
      type: String,
      default: 'en-US',
    },
  },
  setup(props, { slots }) {
    // Provide context to all child components
    const providerValue = computed<ProviderContextProps>(() => ({
      disableAnimation: props.disableAnimation,
      disableRipple: props.disableRipple,
      labelPlacement: props.labelPlacement,
      validationBehavior: props.validationBehavior,
      defaultDates: props.defaultDates,
      createCalendar: props.createCalendar,
      spinnerVariant: props.spinnerVariant,
    }))

    provide(VEROUI_PROVIDER_KEY, providerValue)

    return () => slots.default?.()
  },
})

export default VeroUIProvider
