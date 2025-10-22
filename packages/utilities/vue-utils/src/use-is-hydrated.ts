import { ref, onMounted, type Ref } from 'vue'

/**
 * A composable that returns true if the component is mounted on the client (hydrated)
 * and false when rendering on the server.
 *
 * This composable helps avoid hydration mismatches in SSR applications by providing
 * a reliable way to detect if code is running on the client or server.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIsHydrated } from '@veroui/composables'
 *
 * const isHydrated = useIsHydrated()
 * </script>
 *
 * <template>
 *   <div v-if="!isHydrated">
 *     Loading...
 *   </div>
 *   <div v-else>
 *     Client rendered content
 *   </div>
 * </template>
 * ```
 *
 * @returns Ref<boolean> indicating if the component is hydrated
 */
export function useIsHydrated(): Ref<boolean> {
  // Always start as false to match SSR
  // This prevents hydration mismatches
  const isHydrated = ref(false)

  // Set to true after component is mounted on client
  onMounted(() => {
    isHydrated.value = true
  })

  return isHydrated
}

export type UseIsHydratedReturn = ReturnType<typeof useIsHydrated>
