import { ref, onMounted, onUnmounted } from 'vue'

const MOBILE_SCREEN_WIDTH = 700

export interface UseIsMobileOptions {
  /**
   * Breakpoint width in pixels
   * @default 700
   */
  breakpoint?: number
  /**
   * Whether to listen for window resize events
   * @default true
   */
  reactive?: boolean
}

/**
 * Composable to detect if the current device is mobile
 * Safe for SSR - returns false on server, updates on client
 */
export function useIsMobile(options: UseIsMobileOptions = {}) {
  const { breakpoint = MOBILE_SCREEN_WIDTH, reactive = true } = options

  const isMobile = ref(false)

  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= breakpoint
  }

  const handleResize = () => {
    isMobile.value = checkIsMobile()
  }

  onMounted(() => {
    // Set initial value on mount (client-side only)
    isMobile.value = checkIsMobile()

    // Optionally listen for window resize
    if (reactive) {
      window.addEventListener('resize', handleResize)
    }
  })

  onUnmounted(() => {
    if (reactive && typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize)
    }
  })

  return isMobile
}

// Export for static usage
export { MOBILE_SCREEN_WIDTH }
