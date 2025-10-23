import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'

const isBrowser = typeof window !== 'undefined'

export interface ScrollValue {
  x: number
  y: number
}

function getScrollPosition(element: HTMLElement | undefined | null): ScrollValue {
  if (!isBrowser) return { x: 0, y: 0 }

  if (!element) {
    return { x: window.scrollX, y: window.scrollY }
  }

  return { x: element.scrollLeft, y: element.scrollTop }
}

export interface UseScrollPositionOptions {
  /**
   * The wait time in milliseconds before triggering the callback.
   * @default 30
   */
  delay?: number
  /**
   * Whether the scroll position should be tracked or not.
   * @default true
   */
  isEnabled?: boolean
  /**
   * The element to track the scroll position for.
   */
  elementRef?: Ref<HTMLElement | null | undefined>
  /**
   * The callback function to be called when the scroll position changes.
   */
  callback?: (data: { prevPos: ScrollValue; currPos: ScrollValue }) => void
}

/**
 * Vue composable to track scroll position with throttling
 */
export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { elementRef, delay = 30, callback, isEnabled = true } = options

  const position = ref<ScrollValue>(
    isEnabled ? getScrollPosition(elementRef?.value) : { x: 0, y: 0 }
  )

  let throttleTimeout: ReturnType<typeof setTimeout> | null = null

  const handler = () => {
    const prevPos = { ...position.value }
    const currPos = getScrollPosition(elementRef?.value)

    if (typeof callback === 'function') {
      callback({ prevPos, currPos })
    }

    position.value = currPos
    throttleTimeout = null
  }

  const handleScroll = () => {
    if (delay) {
      if (throttleTimeout) {
        clearTimeout(throttleTimeout)
      }
      throttleTimeout = setTimeout(handler, delay)
    } else {
      handler()
    }
  }

  let target: HTMLElement | Window | null = null

  const setupListener = () => {
    if (!isEnabled || !isBrowser) return

    target = elementRef?.value || window

    target.addEventListener('scroll', handleScroll)
  }

  const cleanupListener = () => {
    if (target) {
      target.removeEventListener('scroll', handleScroll)
    }

    if (throttleTimeout) {
      clearTimeout(throttleTimeout)
      throttleTimeout = null
    }
  }

  // Watch for changes to elementRef and re-setup listener
  watch(
    () => elementRef?.value,
    () => {
      cleanupListener()
      setupListener()
    }
  )

  onMounted(() => {
    setupListener()
  })

  onUnmounted(() => {
    cleanupListener()
  })

  return position
}

export type UseScrollPositionReturn = ReturnType<typeof useScrollPosition>
