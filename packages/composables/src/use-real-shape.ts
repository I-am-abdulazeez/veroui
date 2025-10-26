import { ref, watch, onMounted, type Ref } from 'vue'
import { getRealShape, type ShapeType } from '@veroui/vue-utils'

export type ShapeResult = readonly [Ref<ShapeType>, () => void]

/**
 * Vue composable to get the real shape (dimensions) of an element
 *
 * @param elementRef - Ref to the HTML element
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useRealShape } from '@veroui/composables'
 *
 * const containerRef = ref<HTMLElement>()
 * const [shape, updateShape] = useRealShape(containerRef)
 * </script>
 *
 * <template>
 *   <div ref="containerRef">
 *     <p>Width: {{ shape.width }}px</p>
 *     <p>Height: {{ shape.height }}px</p>
 *     <button @click="updateShape">Update</button>
 *   </div>
 * </template>
 * ```
 */
export function useRealShape<T extends HTMLElement = HTMLElement>(
  elementRef: Ref<T | null | undefined>
): ShapeResult {
  const shape = ref<ShapeType>({
    width: 0,
    height: 0,
  })

  const updateShape = (): void => {
    if (!elementRef.value) return

    const { width, height } = getRealShape(elementRef.value)
    shape.value = { width, height }
  }

  // Watch for ref changes
  watch(
    () => elementRef.value,
    () => {
      updateShape()
    }
  )

  // Update on mount
  onMounted(() => {
    updateShape()
  })

  return [shape, updateShape] as const
}

export type UseRealShapeReturn = ReturnType<typeof useRealShape>
