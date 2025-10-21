import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  KEY: 'veroui-theme',
  // light theme
  LIGHT: 'light',
  // dark theme
  DARK: 'dark',
  // system theme
  SYSTEM: 'system',
} as const

// type definition for Theme using system theme names or custom theme names
export type CustomTheme = string
export type Theme =
  | typeof ThemeProps.LIGHT
  | typeof ThemeProps.DARK
  | typeof ThemeProps.SYSTEM
  | CustomTheme

/**
 * Vue composable to switch between themes
 *
 * @param defaultTheme the default theme name (e.g. light, dark, purple-dark and etc)
 * @returns An object containing the current theme and theme manipulation functions
 */
export function useTheme(defaultTheme: Theme = ThemeProps.SYSTEM) {
  const MEDIA = '(prefers-color-scheme: dark)'

  // Initialize theme state
  const getInitialTheme = (): Theme => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return defaultTheme

    const storedTheme = localStorage.getItem(ThemeProps.KEY) as Theme | null

    // return stored theme if it is selected previously
    if (storedTheme) return storedTheme

    // if it is using system theme, check `prefers-color-scheme` value
    // return light theme if not specified
    if (defaultTheme === ThemeProps.SYSTEM) {
      return window.matchMedia?.(MEDIA).matches ? ThemeProps.DARK : ThemeProps.LIGHT
    }

    return defaultTheme
  }

  const theme = ref<Theme>(getInitialTheme())

  const setTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return

    const targetTheme =
      newTheme === ThemeProps.SYSTEM
        ? window.matchMedia?.(MEDIA).matches
          ? ThemeProps.DARK
          : ThemeProps.LIGHT
        : newTheme

    localStorage.setItem(ThemeProps.KEY, newTheme)

    // Remove all theme classes
    document.documentElement.classList.remove(
      ThemeProps.LIGHT,
      ThemeProps.DARK,
      ThemeProps.SYSTEM,
    )

    // Add the target theme class
    document.documentElement.classList.add(targetTheme)

    theme.value = newTheme
  }

  const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
    if (theme.value === ThemeProps.SYSTEM) {
      const systemTheme = e.matches ? ThemeProps.DARK : ThemeProps.LIGHT

      // Update DOM without updating stored theme (keep it as 'system')
      document.documentElement.classList.remove(ThemeProps.LIGHT, ThemeProps.DARK)
      document.documentElement.classList.add(systemTheme)
    }
  }

  // Watch for theme changes
  watch(theme, (newTheme) => {
    setTheme(newTheme)
  })

  // Set up media query listener on mount
  onMounted(() => {
    if (typeof window === 'undefined') return

    // Apply initial theme
    setTheme(theme.value)

    // Listen for system theme changes
    const media = window.matchMedia(MEDIA)

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', handleMediaQuery)
    } else {
      // Fallback for older browsers
      media.addListener(handleMediaQuery)
    }
  })

  // Clean up on unmount
  onUnmounted(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(MEDIA)

    if (media.removeEventListener) {
      media.removeEventListener('change', handleMediaQuery)
    } else {
      media.removeListener(handleMediaQuery)
    }
  })

  return {
    theme,
    setTheme,
  }
}

export type UseThemeReturn = ReturnType<typeof useTheme>
