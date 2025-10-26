import { ref, computed, watch, type Ref } from 'vue'
import { range } from '@veroui/shared-utils'

export enum PaginationItemType {
  DOTS = 'dots',
  PREV = 'prev',
  NEXT = 'next',
}

export interface UsePaginationProps {
  /**
   * The total number of pages.
   */
  total: number
  /**
   * The selected page on initial render.
   * @default 1
   */
  initialPage?: number
  /**
   * The controlled selected page.
   */
  page?: number
  /**
   * The number of pages to show on each side of the current page.
   * @default 1
   */
  siblings?: number
  /**
   * The number of pages to show at the beginning and end of the pagination.
   * @default 1
   */
  boundaries?: number
  /**
   * If `true`, the range will include "prev" and "next" buttons.
   * @default false
   */
  showControls?: boolean
  /**
   * Callback fired when the page changes.
   */
  onChange?: (page: number) => void
  /**
   * Text direction for RTL support
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl'
}

export type PaginationItemValue = number | PaginationItemType

/**
 * Vue composable for pagination logic
 *
 * @example
 * ```vue
 * <script setup>
 * import { usePagination } from '@veroui/composables'
 *
 * const { range, activePage, setPage, next, previous } = usePagination({
 *   total: 10,
 *   initialPage: 1,
 *   siblings: 1,
 *   boundaries: 1,
 *   showControls: true
 * })
 * </script>
 *
 * <template>
 *   <div>
 *     <button @click="previous">Previous</button>
 *     <button
 *       v-for="item in range"
 *       :key="item"
 *       @click="typeof item === 'number' && setPage(item)"
 *     >
 *       {{ item }}
 *     </button>
 *     <button @click="next">Next</button>
 *   </div>
 * </template>
 * ```
 */
export function usePagination(props: UsePaginationProps) {
  const {
    page,
    total,
    siblings = 1,
    boundaries = 1,
    initialPage = 1,
    showControls = false,
    direction = 'ltr',
    onChange,
  } = props

  const activePage = ref(page ?? initialPage)
  const isRTL = direction === 'rtl'

  const onChangeActivePage = (newPage: number) => {
    activePage.value = newPage
    onChange?.(newPage)
  }

  // Watch for external page changes
  watch(
    () => page,
    (newPage) => {
      if (newPage !== undefined && newPage !== activePage.value) {
        activePage.value = newPage
      }
    }
  )

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      onChangeActivePage(1)
    } else if (pageNumber > total) {
      onChangeActivePage(total)
    } else {
      onChangeActivePage(pageNumber)
    }
  }

  const next = () => setPage(activePage.value + 1)
  const previous = () => setPage(activePage.value - 1)
  const first = () => setPage(1)
  const last = () => setPage(total)

  const formatRange = (range: PaginationItemValue[]) => {
    if (showControls) {
      return [PaginationItemType.PREV, ...range, PaginationItemType.NEXT]
    }

    return range
  }

  const paginationRange = computed((): PaginationItemValue[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2

    if (totalPageNumbers >= total) {
      return formatRange(range(1, total))
    }

    const leftSiblingIndex = Math.max(activePage.value - siblings, boundaries)
    const rightSiblingIndex = Math.min(activePage.value + siblings, total - boundaries)

    /*
     * We do not want to show dots if there is only one position left
     * after/before the left/right page count as that would lead to a change if our Pagination
     * component size which we do not want
     */
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1)

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2

      return formatRange([
        ...range(1, leftItemCount),
        PaginationItemType.DOTS,
        ...range(total - (boundaries - 1), total),
      ])
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings

      return formatRange([
        ...range(1, boundaries),
        PaginationItemType.DOTS,
        ...range(total - rightItemCount, total),
      ])
    }

    return formatRange([
      ...range(1, boundaries),
      PaginationItemType.DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      PaginationItemType.DOTS,
      ...range(total - boundaries + 1, total),
    ])
  })

  return {
    range: paginationRange,
    activePage,
    setPage,
    next,
    previous,
    first,
    last,
  }
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
