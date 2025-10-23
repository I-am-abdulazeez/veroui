import { onMounted, onUnmounted, watch, type Ref } from 'vue'

/**
 * Simple window resize listener
 *
 * @param callback - Function to call on window resize
 * @param immediatelyInvoke - Whether to call the callback immediately on mount
 *
 * @example
 * ```ts
 * useResize(() => {
 *   console.log('Window resized!')
 * })
 * ```
 */
export function useResize(callback: () => void, immediatelyInvoke: boolean = true) {
  const fn = () => callback()

  onMounted(() => {
    if (immediatelyInvoke) {
      fn()
    }

    window.addEventListener('resize', fn)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fn)
  })
}

/**
 * Check if ResizeObserver is available
 */
function hasResizeObserver(): boolean {
  return typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined'
}

export interface UseResizeObserverOptions<T extends Element = Element> {
  /**
   * Ref to the element to observe
   */
  ref: Ref<T | null | undefined>
  /**
   * Which box model to observe
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions
  /**
   * Callback when element resizes
   */
  onResize: () => void
}

/**
 * Observe element resize using ResizeObserver API
 * Falls back to window resize if ResizeObserver is not available
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useResizeObserver } from '@veroui/composables'
 *
 * const elementRef = ref<HTMLElement>()
 *
 * useResizeObserver({
 *   ref: elementRef,
 *   onResize: () => {
 *     console.log('Element resized!')
 *   }
 * })
 * </script>
 *
 * <template>
 *   <div ref="elementRef">
 *     Content
 *   </div>
 * </template>
 * ```
 */
export function useResizeObserver<T extends Element = Element>(
  options: UseResizeObserverOptions<T>
): void {
  const { ref, box = 'content-box', onResize } = options

  let resizeObserverInstance: ResizeObserver | null = null
  let cleanupFn: (() => void) | null = null

  const setup = () => {
    // Clean up previous observer if it exists
    cleanup()

    const element = ref.value

    if (!element) {
      return
    }

    if (!hasResizeObserver()) {
      // Fallback to window resize
      window.addEventListener('resize', onResize, false)
      cleanupFn = () => {
        window.removeEventListener('resize', onResize, false)
      }
    } else {
      // Use ResizeObserver
      resizeObserverInstance = new ResizeObserver((entries) => {
        if (!entries.length) {
          return
        }
        onResize()
      })

      resizeObserverInstance.observe(element, { box })

      cleanupFn = () => {
        if (resizeObserverInstance && element) {
          resizeObserverInstance.unobserve(element)
          resizeObserverInstance.disconnect()
          resizeObserverInstance = null
        }
      }
    }
  }

  const cleanup = () => {
    if (cleanupFn) {
      cleanupFn()
      cleanupFn = null
    }
  }

  // Watch for ref changes and re-setup observer
  watch(
    () => ref.value,
    () => {
      setup()
    },
    { immediate: true }
  )

  onUnmounted(() => {
    cleanup()
  })
}
