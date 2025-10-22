import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseIsMountedProps {
  /**
   * Whether to trigger a reactive update when mounted
   * @default false
   */
  rerender?: boolean
  /**
   * Delay in milliseconds before updating the reactive state
   * @default 0
   */
  delay?: number
}

export function useIsMounted(props: UseIsMountedProps = {}) {
  const { rerender = false, delay = 0 } = props

  // Non-reactive ref for immediate checks
  const isMountedRef = ref(false)

  // Reactive ref for triggering rerenders
  const isMounted = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    // Update the non-reactive ref immediately
    isMountedRef.value = true

    // Optionally update the reactive ref
    if (rerender) {
      if (delay > 0) {
        timer = setTimeout(() => {
          isMounted.value = true
        }, delay)
      } else {
        isMounted.value = true
      }
    }
  })

  onUnmounted(() => {
    // Update the non-reactive ref
    isMountedRef.value = false

    // Update the reactive ref
    if (rerender) {
      isMounted.value = false
    }

    // Clear any pending timers
    if (timer) {
      clearTimeout(timer)
    }
  })

  // Return a function that checks if mounted (non-reactive)
  // and the reactive mounted state
  const checkIsMounted = () => isMountedRef.value

  return {
    /**
     * Function to check if component is mounted (non-reactive)
     */
    isMounted: checkIsMounted,
    /**
     * Reactive ref indicating if component is mounted
     * Only updates if `rerender` is true
     */
    isMountedRef: isMounted,
  }
}

export type UseIsMountedReturn = ReturnType<typeof useIsMounted>
