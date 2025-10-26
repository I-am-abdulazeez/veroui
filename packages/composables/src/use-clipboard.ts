import { ref, onUnmounted } from 'vue'

export interface UseClipboardProps {
  /**
   * The time in milliseconds to wait before resetting the clipboard.
   * @default 2000
   */
  timeout?: number
}

const transformValue = (text: string) => {
  // Manually replace all &nbsp; to avoid get different unicode characters;
  return text.replace(/[\u00A0]/g, ' ')
}

/**
 * Vue composable for copying text to clipboard.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useClipboard } from '@veroui/composables'
 *
 * const { copy, copied, error, reset } = useClipboard({ timeout: 2000 })
 *
 * const handleCopy = () => {
 *   copy('Text to copy')
 * }
 * </script>
 *
 * <template>
 *   <div>
 *     <button @click="handleCopy">
 *       {{ copied ? 'Copied!' : 'Copy' }}
 *     </button>
 *     <p v-if="error">{{ error.message }}</p>
 *   </div>
 * </template>
 * ```
 *
 * @param {number} timeout - timeout in ms, default 2000
 * @returns {copy, copied, error, reset} - copy function, copied state, error state, reset function
 */
export function useClipboard({ timeout = 2000 }: UseClipboardProps = {}) {
  const error = ref<Error | null>(null)
  const copied = ref(false)
  let copyTimeout: ReturnType<typeof setTimeout> | null = null

  const onClearTimeout = () => {
    if (copyTimeout) {
      clearTimeout(copyTimeout)
      copyTimeout = null
    }
  }

  const handleCopyResult = (value: boolean) => {
    onClearTimeout()
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, timeout)
    copied.value = value
  }

  const copy = (valueToCopy: any) => {
    if ('clipboard' in navigator) {
      const transformedValue =
        typeof valueToCopy === 'string' ? transformValue(valueToCopy) : valueToCopy

      navigator.clipboard
        .writeText(transformedValue)
        .then(() => handleCopyResult(true))
        .catch((err) => {
          error.value = err
        })
    } else {
      error.value = new Error('useClipboard: navigator.clipboard is not supported')
    }
  }

  const reset = () => {
    copied.value = false
    error.value = null
    onClearTimeout()
  }

  // Cleanup on unmount
  onUnmounted(() => {
    onClearTimeout()
  })

  return { copy, reset, error, copied }
}

export type UseClipboardReturn = ReturnType<typeof useClipboard>
