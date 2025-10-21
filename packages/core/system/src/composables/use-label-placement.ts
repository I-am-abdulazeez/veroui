import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useProviderContext } from './use-provider'

export type LabelPlacement = 'inside' | 'outside' | 'outside-left'
export type InputLabelPlacement = 'inside' | 'outside' | 'outside-left' | 'outside-top'

export interface UseLabelPlacementProps {
  labelPlacement?: MaybeRefOrGetter<LabelPlacement | undefined>
  label?: MaybeRefOrGetter<string | undefined>
}

export interface UseInputLabelPlacementProps {
  labelPlacement?: MaybeRefOrGetter<InputLabelPlacement | undefined>
  label?: MaybeRefOrGetter<string | undefined>
}

/**
 * Composable to determine label placement for components
 * Falls back to global context if not provided
 */
export function useLabelPlacement(props: UseLabelPlacementProps) {
  const globalContext = useProviderContext()

  return computed(() => {
    const propsLabelPlacement = toValue(props.labelPlacement)
    const propsLabel = toValue(props.label)
    const globalLabelPlacement = globalContext.value.labelPlacement as LabelPlacement | undefined

    const labelPlacement = propsLabelPlacement ?? globalLabelPlacement ?? 'inside'

    // If placement is "inside" but there's no label, fall back to "outside"
    if (labelPlacement === 'inside' && !propsLabel) {
      return 'outside' as const
    }

    return labelPlacement
  })
}

/**
 * Composable to determine label placement for input components
 * Supports an additional "outside-top" placement
 */
export function useInputLabelPlacement(props: UseInputLabelPlacementProps) {
  const globalContext = useProviderContext()

  return computed(() => {
    const propsLabelPlacement = toValue(props.labelPlacement)
    const propsLabel = toValue(props.label)
    const globalLabelPlacement = globalContext.value.labelPlacement as InputLabelPlacement | undefined

    const labelPlacement = propsLabelPlacement ?? globalLabelPlacement ?? 'inside'

    // If placement is "inside" but there's no label, fall back to "outside"
    if (labelPlacement === 'inside' && !propsLabel) {
      return 'outside' as const
    }

    return labelPlacement
  })
}
