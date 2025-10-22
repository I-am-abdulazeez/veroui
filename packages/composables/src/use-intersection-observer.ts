import { ref, watch, onBeforeUnmount, type Ref } from 'vue'

export interface UseIntersectionObserverOptions {
  root?: Element | Document | null
  isEnabled?: boolean
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
  initialIsIntersecting?: boolean
}

export interface IntersectionReturn {
  ref: Ref<Element | null>
  isIntersecting: Ref<boolean>
  entry: Ref<IntersectionObserverEntry | undefined>
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): IntersectionReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    isEnabled = true,
    freezeOnceVisible = false,
    initialIsIntersecting = false,
    onChange,
  } = options

  const elementRef = ref<Element | null>(null)
  const isIntersecting = ref(initialIsIntersecting)
  const entry = ref<IntersectionObserverEntry | undefined>(undefined)

  let observer: IntersectionObserver | null = null
  let frozen = false

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const observe = () => {
    cleanup()

    // Skip if not enabled
    if (!isEnabled) return

    // Ensure we have a ref to observe
    if (!elementRef.value) return

    // Ensure the browser supports the Intersection Observer API
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    // Skip if frozen
    if (frozen) return

    observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const thresholds = Array.isArray(observer!.thresholds)
          ? observer!.thresholds
          : [observer!.thresholds]

        entries.forEach((observerEntry) => {
          const intersecting =
            observerEntry.isIntersecting &&
            thresholds.some((t) => observerEntry.intersectionRatio >= t)

          isIntersecting.value = intersecting
          entry.value = observerEntry

          if (onChange) {
            onChange(intersecting, observerEntry)
          }

          if (intersecting && freezeOnceVisible) {
            frozen = true
            cleanup()
          }
        })
      },
      { threshold, root, rootMargin }
    )

    observer.observe(elementRef.value)
  }

  watch(
    [elementRef, () => isEnabled, () => frozen],
    () => {
      observe()
    },
    { immediate: true } // Observe immediately
  )

  watch(elementRef, (newVal, oldVal) => {
    if (!newVal && entry.value?.target && !freezeOnceVisible && !frozen && oldVal !== entry.value.target) {
      isIntersecting.value = initialIsIntersecting
      entry.value = undefined
    }
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    ref: elementRef,
    isIntersecting,
    entry,
  }
}
