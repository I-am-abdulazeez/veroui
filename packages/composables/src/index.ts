// Observers
export {
  useIntersectionObserver,
  type UseIntersectionObserverOptions,
  type IntersectionReturn,
} from './use-intersection-observer'

// State management
export { useControllableState, type UseControllableStateProps } from './use-controllable-state'
export { useDisclosure, type UseDisclosureProps, type UseDisclosureReturn } from './use-disclosure'

// Theme
export {
  useTheme,
  ThemeProps,
  type Theme,
  type CustomTheme,
  type UseThemeReturn
} from './use-theme'

// Scroll
export {
  useInfiniteScroll,
  type UseInfiniteScrollProps,
  type UseInfiniteScrollReturn,
} from './use-infinite-scroll'

export {
  useScrollPosition,
  type UseScrollPositionOptions,
  type ScrollValue,
  type UseScrollPositionReturn,
} from './use-scroll-position'

// Lifecycle
export {
  useIsMounted,
  type UseIsMountedProps,
  type UseIsMountedReturn,
} from './use-is-mounted'

// Device detection
export {
  useIsMobile,
  MOBILE_SCREEN_WIDTH,
  type UseIsMobileOptions,
} from './use-is-mobile'

export {
  useViewportSize,
  type ViewportSize,
  type UseViewportSizeReturn,
} from './use-viewport-size'
