import { ref, onMounted, onUnmounted } from 'vue'

export interface ViewportSize {
  width: number
  height: number
}

const visualViewport = typeof window !== 'undefined' ? window.visualViewport : undefined

function getViewportSize(): ViewportSize {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  return {
    width: (visualViewport && visualViewport?.width) || window.innerWidth,
    height: (visualViewport && visualViewport?.height) || window.innerHeight,
  }
}

/**
 * Vue composable to track viewport size
 * Uses visualViewport API when available to properly handle iOS virtual keyboard
 *
 * @example
 * ```vue
 * <script setup>
 * import { useViewportSize } from '@veroui/composables'
 *
 * const { width, height } = useViewportSize()
 * </script>
 *
 * <template>
 *   <div>Viewport: {{ width }}x{{ height }}</div>
 * </template>
 * ```
 */
export function useViewportSize() {
  const size = ref<ViewportSize>(getViewportSize())

  const onResize = () => {
    const newSize = getViewportSize()

    // Only update if dimensions actually changed (performance optimization)
    if (newSize.width !== size.value.width || newSize.height !== size.value.height) {
      size.value = newSize
    }
  }

  onMounted(() => {
    // Use visualViewport API to track available height even on iOS virtual keyboard opening
    if (!visualViewport) {
      window.addEventListener('resize', onResize)
    } else {
      visualViewport.addEventListener('resize', onResize)
    }
  })

  onUnmounted(() => {
    if (!visualViewport) {
      window.removeEventListener('resize', onResize)
    } else {
      visualViewport.removeEventListener('resize', onResize)
    }
  })

  return size
}

export type UseViewportSizeReturn = ReturnType<typeof useViewportSize>
