import { computed } from 'vue'
import { spinner, type SpinnerVariantProps } from '@veroui/theme'
import { useProviderContext } from '@veroui/system'
import type { SpinnerSlots } from './types'

export interface UseSpinnerProps extends SpinnerVariantProps {
  /**
   * Spinner label, in case you passed it will be used as `aria-label`.
   */
  label?: string
  /**
   * Classname or List of classes to change the classNames of the element.
   */
  classNames?: Partial<Record<SpinnerSlots, string>>
  /**
   * Custom class name.
   */
  className?: string
}

export function useSpinner(props: UseSpinnerProps) {
  const globalContext = useProviderContext()

  const variant = computed(() => props.variant ?? globalContext.value.spinnerVariant ?? 'default')
  const size = computed(() => props.size ?? 'md')
  const color = computed(() => props.color ?? 'primary')

  const slots = computed(() =>
    spinner({
      size: size.value,
      color: color.value,
      variant: variant.value,
    })
  )

  const ariaLabel = computed(() => {
    if (props.label && typeof props.label === 'string') {
      return props.label
    }
    return 'Loading'
  })

  const spinnerProps = computed(() => ({
    'aria-label': ariaLabel.value,
    role: 'status',
    class: slots.value.base({ class: [props.classNames?.base, props.className] }),
  }))

  return {
    variant,
    size,
    color,
    label: computed(() => props.label),
    slots,
    classNames: computed(() => props.classNames),
    spinnerProps,
  }
}

export type UseSpinnerReturn = ReturnType<typeof useSpinner>
