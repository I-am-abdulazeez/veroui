import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * Vue composable for handling form reset events
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useFormReset } from '@veroui/composables'
 *
 * const inputRef = ref<HTMLInputElement | null>(null)
 * const value = ref('initial value')
 *
 * useFormReset(inputRef, 'initial value', (resetValue) => {
 *   value.value = resetValue
 * })
 * </script>
 *
 * <template>
 *   <form>
 *     <input ref="inputRef" v-model="value" />
 *     <button type="reset">Reset</button>
 *   </form>
 * </template>
 * ```
 */
export function useFormReset<T>(
  elementRef: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null> | undefined,
  initialValue: T,
  onReset: (value: T) => void,
): void {
  const resetValue = ref(initialValue) as Ref<T>

  let form: HTMLFormElement | null = null

  const handleReset = () => {
    onReset(resetValue.value)
  }

  watch(
    () => elementRef?.value,
    (element) => {
      // Clean up previous listener
      form?.removeEventListener('reset', handleReset)

      // Add new listener
      form = element?.form ?? null
      form?.addEventListener('reset', handleReset)
    },
    { immediate: true }
  )

  onUnmounted(() => {
    form?.removeEventListener('reset', handleReset)
  })
}
