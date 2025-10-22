import { ref, watch, onUnmounted } from 'vue';
import { debounce } from '@veroui/shared-utils';

export interface UseInfiniteScrollProps {
  /**
   * Whether the infinite scroll is enabled.
   * @default true
   */
  isEnabled?: boolean
  /**
   * Whether there are more items to load, the observer will disconnect when there are no more items to load.
   */
  hasMore?: boolean
  /**
   * The distance in pixels before the end of the items that will trigger a call to load more.
   * @default 250
   */
  distance?: number
  /**
   * Use loader element for the scroll detection.
   */
  shouldUseLoader?: boolean
  /**
   * Callback to load more items.
   */
  onLoadMore?: () => void
}

export function useInfiniteScroll(props: UseInfiniteScrollProps = {}) {
  const {
    hasMore = true,
    distance = 250,
    isEnabled = true,
    shouldUseLoader = true,
    onLoadMore,
  } = props

  const scrollContainerRef = ref<HTMLElement | null>(null)
  const loaderRef = ref<HTMLElement | null>(null)
  const observerRef = ref<IntersectionObserver | null>(null)
  const isLoadingRef = ref(false)

  const loadMore = () => {
    if (!isLoadingRef.value && hasMore && onLoadMore) {
      isLoadingRef.value = true
      onLoadMore()

      // Debounce time to prevent multiple calls
      setTimeout(() => {
        isLoadingRef.value = false
      }, 100)
    }
  }

  const setupIntersectionObserver = () => {
    const scrollContainerNode = scrollContainerRef.value
    const loaderNode = loaderRef.value

    if (!scrollContainerNode || !loaderNode) return

    const options: IntersectionObserverInit = {
      root: scrollContainerNode,
      rootMargin: `0px 0px ${distance}px 0px`,
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries

      if (entry.isIntersecting) {
        loadMore()
      }
    }, options)

    observer.observe(loaderNode)
    observerRef.value = observer
  }

  const setupScrollListener = () => {
    const scrollContainerNode = scrollContainerRef.value

    if (!scrollContainerNode) return

    const debouncedCheckIfNearBottom = debounce(() => {
      if (
        scrollContainerNode.scrollHeight - scrollContainerNode.scrollTop <=
        scrollContainerNode.clientHeight + distance
      ) {
        loadMore()
      }
    }, 100)

    scrollContainerNode.addEventListener('scroll', debouncedCheckIfNearBottom)

    return () => {
      scrollContainerNode.removeEventListener('scroll', debouncedCheckIfNearBottom)
    }
  }

  const cleanup = () => {
    if (observerRef.value) {
      observerRef.value.disconnect()
      observerRef.value = null
    }
  }

  // Watch for changes and setup/cleanup accordingly
  watch(
    () => [isEnabled, hasMore, scrollContainerRef.value, loaderRef.value],
    () => {
      cleanup()

      if (!isEnabled || !scrollContainerRef.value || !hasMore) return

      if (shouldUseLoader) {
        setupIntersectionObserver()
      } else {
        setupScrollListener()
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    cleanup()
  })

  return {
    loaderRef,
    scrollContainerRef,
  }
}

export type UseInfiniteScrollReturn = ReturnType<typeof useInfiniteScroll>
