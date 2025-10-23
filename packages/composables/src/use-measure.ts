import { ref, watch, onUnmounted, type Ref } from 'vue'

export type Dimensions = {
  width: number | null
  height: number | null
}

/**
 * A Vue composable that measures the dimensions of a DOM element.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useMeasure } from '@veroui/composables'
 *
 * const { elementRef, dimensions } = useMeasure()
 * </script>
 *
 * <template>
 *   <div :ref="elementRef">
 *     Width: {{ dimensions.width }}, Height: {{ dimensions.height }}
 *   </div>
 * </template>
 * ```
 *
 * @returns An object containing the element ref and reactive dimensions
 */
export function useMeasure(): {
  elementRef: Ref<Element | null>
  dimensions: Ref<Dimensions>
} {
  const elementRef = ref<Element | null>(null)
  const dimensions = ref<Dimensions>({
    width: null,
    height: null,
  })

  let observer: ResizeObserver | null = null

  // Watch the elementRef and observe when it changes
  watch(
    elementRef,
    (element, _, onCleanup) => {
      // Clean up previous observer
      if (observer) {
        observer.disconnect()
        observer = null
      }

      // Set up new observer if element exists
      if (element?.nodeType === Node.ELEMENT_NODE) {
        observer = new ResizeObserver(([entry]) => {
          if (entry && entry.borderBoxSize) {
            const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0]
            dimensions.value = { width, height }
          }
        })

        observer.observe(element)
      }

      // Cleanup when watch stops or element changes
      onCleanup(() => {
        if (observer) {
          observer.disconnect()
          observer = null
        }
      })
    },
    { immediate: true }
  )

  // Cleanup on unmount
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    elementRef,
    dimensions,
  }
}

export type UseMeasureReturn = ReturnType<typeof useMeasure>
