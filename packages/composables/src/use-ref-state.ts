import { ref, type Ref } from 'vue'

/**
 * Vue composable that provides both reactive state and a stable ref to the current value
 *
 * Useful when you need:
 * - Reactive state for the template
 * - Immediate access to current value in callbacks (without stale closures)
 *
 * @param initialState - Initial state value or factory function
 *
 * @example
 * ```vue
 * <script setup>
 * import { useRefState } from '@veroui/composables'
 *
 * const [count, setCount, countRef] = useRefState(0)
 *
 * // count is reactive
 * // setCount updates both count and countRef
 * // countRef.value always has the latest value
 *
 * const handleClick = () => {
 *   setTimeout(() => {
 *     // countRef.value always has the latest value
 *     console.log('Latest count:', countRef.value)
 *   }, 1000)
 * }
 * </script>
 * ```
 */
export function useRefState<S>(
  initialState: S | (() => S)
): readonly [Ref<S>, (val: S | ((prevState: S) => S)) => void, Ref<S>] {
  // Initialize state
  const state = ref<S>(
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState
  ) as Ref<S>

  // Create a separate ref that always has the current value
  const stateRef = ref<S>(state.value) as Ref<S>

  // Setter function that updates both
  const setValue = (val: S | ((prevState: S) => S)): void => {
    const result = typeof val === 'function'
      ? (val as (prevState: S) => S)(stateRef.value)
      : val

    state.value = result
    stateRef.value = result
  }

  return [state, setValue, stateRef] as const
}

export type UseRefStateReturn<S> = readonly [
  Ref<S>,
  (val: S | ((prevState: S) => S)) => void,
  Ref<S>
]
