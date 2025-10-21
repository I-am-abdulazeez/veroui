import { ref, watch, type Ref, unref, type MaybeRef } from 'vue'

export interface UseControllableStateProps<T> {
  /**
   * The controlled value
   */
  value?: MaybeRef<T | undefined>
  /**
   * The default value (uncontrolled)
   */
  defaultValue?: T
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: T) => void
}

/**
 * Vue composable for managing controlled/uncontrolled state
 * Similar to React's useControlledState
 */
export function useControllableState<T>(
  props: UseControllableStateProps<T>
): [Ref<T>, (value: T) => void] {
  const { value: valueProp, defaultValue, onChange } = props

  // Internal state for uncontrolled mode
  const internalValue = ref<T>(defaultValue as T)

  // Determine if controlled
  const isControlled = valueProp !== undefined

  // Use controlled value if provided, otherwise use internal state
  const currentValue = isControlled ? ref(unref(valueProp)) : internalValue

  // Watch for external changes to controlled value
  if (isControlled && valueProp !== undefined) {
    watch(
      () => unref(valueProp),
      (newValue) => {
        if (newValue !== undefined) {
          currentValue.value = newValue as T
        }
      },
      { immediate: true }
    )
  }

  // Setter function
  const setValue = (newValue: T) => {
    if (!isControlled) {
      internalValue.value = newValue
      currentValue.value = newValue
    }
    onChange?.(newValue)
  }

  return [currentValue as Ref<T>, setValue]
}
