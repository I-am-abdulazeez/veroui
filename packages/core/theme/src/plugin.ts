/**
 * VeroUI Tailwind CSS Plugin
 * Adapted from HeroUI for Vue
 * Credits to: HeroUI
 */

import type { ConfigTheme, ConfigThemes, DefaultThemeType, VeroUIPluginConfig } from './types'

import * as Color from "color2k";
// @ts-ignore
import plugin from 'tailwindcss/plugin.js'
import deepMerge from 'deepmerge'

import { semanticColors, commonColors } from './colors'
import { animations } from './animations'
import { utilities } from './utilities'
import { flattenThemeObject } from './utils/object'
import { isBaseTheme } from './utils/theme'
import { lightLayout, darkLayout, defaultLayout } from './default-layout'
import { baseStyles } from './utils/classes'
import { DEFAULT_TRANSITION_DURATION } from './utilities/transition'
import { kebabCase, mapKeys, omit } from '@veroui/shared-utils'

const DEFAULT_PREFIX = 'veroui'

const parsedColorsCache: Record<string, number[]> = {}

// Parse color to HSL
const parseColor = (colorValue: string): number[] => {
  if (parsedColorsCache[colorValue]) {
    return parsedColorsCache[colorValue]
  }

  try {
    const [h, s, l, a] = Color.parseToHsla(colorValue)
    const result = [
      Math.round(h),
      Math.round(s * 100),
      Math.round(l * 100),
      a
    ]
    parsedColorsCache[colorValue] = result
    return result
  } catch (error) {
    console.error(`Error parsing color ${colorValue}:`, error)
    return [0, 0, 0, 1]
  }
}

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<string, string>
    baseStyles: Record<string, Record<string, any>>
  } = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  }

  for (const [themeName, themeConfig] of Object.entries(themes)) {
    const { extend, layout, colors } = themeConfig
    let cssSelector = `.${themeName}`
    const scheme = themeName === 'light' || themeName === 'dark' ? themeName : extend
    let baseSelector = ''

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      baseSelector = `:root, [data-theme=${themeName}]`
    }

    baseSelector &&
      (resolved.baseStyles[baseSelector] = scheme
        ? {
          'color-scheme': scheme,
        }
        : {})

    resolved.utilities[cssSelector] = scheme
      ? {
        'color-scheme': scheme,
      }
      : {}

    // flatten color definitions
    const flatColors = flattenThemeObject(colors) as Record<string, string>

    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {}

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) continue

      try {
        const [h, s, l, defaultAlphaValue] = parseColor(colorValue)
        const veroUIColorVariable = `--${prefix}-${colorName}`

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![veroUIColorVariable] = `${h} ${s}% ${l}%`
        baseSelector &&
          (resolved.baseStyles[baseSelector]![veroUIColorVariable] = `${h} ${s}% ${l}%`)
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = `hsl(var(${veroUIColorVariable}) / ${defaultAlphaValue ?? '<alpha-value>'
          })`
      } catch (error: any) {
        console.error('Error processing color:', error?.message)
      }
    }

    /**
     * Layout
     */
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) continue

      const layoutVariablePrefix = `--${prefix}-${key}`

      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue
          baseSelector && (resolved.baseStyles[baseSelector]![nestedLayoutVariable] = nestedValue)
        }
      } else {
        // Handle opacity values and other singular layout values
        const formattedValue =
          layoutVariablePrefix.includes('opacity') && typeof value === 'number'
            ? value.toString().replace(/^0\./, '.')
            : value

        resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue
        baseSelector && (resolved.baseStyles[baseSelector]![layoutVariablePrefix] = formattedValue)
      }
    }
  }

  return resolved
}

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  addCommonColors: boolean,
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix)

  const createStripeGradient = (stripeColor: string, backgroundColor: string) =>
    `linear-gradient(45deg, hsl(var(--${prefix}-${stripeColor})) 25%, hsl(var(--${prefix}-${backgroundColor})) 25%, hsl(var(--${prefix}-${backgroundColor})) 50%, hsl(var(--${prefix}-${stripeColor})) 50%, hsl(var(--${prefix}-${stripeColor})) 75%, hsl(var(--${prefix}-${backgroundColor})) 75%, hsl(var(--${prefix}-${backgroundColor})))`

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      // add base classNames
      addBase({
        [':root, [data-theme]']: {
          ...baseStyles(prefix),
        },
      })

      // add the base styles to "@layer base"
      addBase({ ...resolved?.baseStyles })

      // add the css variables to "@layer utilities"
      addUtilities({ ...resolved?.utilities, ...utilities })
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition)
      })
    },
    // extend the colors config
    {
      theme: {
        extend: {
          // @ts-ignore
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved?.colors,
          },
          scale: {
            '80': '0.8',
            '85': '0.85',
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
            1: '1px',
            1.5: '1.5px',
            3: '3px',
            5: '5px',
          },
          boxShadow: {
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`,
          },
          backgroundSize: {
            'stripe-size': '1.25rem 1.25rem',
          },
          backgroundImage: {
            'stripe-gradient-default': createStripeGradient('default-200', 'default-400'),
            'stripe-gradient-primary': createStripeGradient('primary-200', 'primary'),
            'stripe-gradient-secondary': createStripeGradient('secondary-200', 'secondary'),
            'stripe-gradient-success': createStripeGradient('success-200', 'success'),
            'stripe-gradient-warning': createStripeGradient('warning-200', 'warning'),
            'stripe-gradient-danger': createStripeGradient('danger-200', 'danger'),
          },
          transitionDuration: {
            0: '0ms',
            250: '250ms',
            400: '400ms',
            DEFAULT: DEFAULT_TRANSITION_DURATION,
          },
          transitionTimingFunction: {
            'soft-spring': 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
          },
          ...animations,
        },
      },
    },
  )
}

export const veroui = (config: VeroUIPluginConfig = {}): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = 'light',
    layout: userLayout,
    defaultExtendTheme = 'light',
    prefix: defaultPrefix = DEFAULT_PREFIX,
    addCommonColors = false,
  } = config

  const userLightColors = themeObject?.light?.colors || {}
  const userDarkColors = themeObject?.dark?.colors || {}

  const defaultLayoutObj =
    userLayout && typeof userLayout === 'object'
      ? deepMerge(defaultLayout, userLayout)
      : defaultLayout

  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  }

  // get other themes from the config different from light and dark
  const otherThemes = omit(themeObject, ['light', 'dark']) as ConfigThemes

  Object.entries(otherThemes).forEach(([themeName, themeConfig]) => {
    if (!themeConfig) return

    const { extend, colors, layout } = themeConfig
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme

    const baseColors = semanticColors[baseTheme as 'light' | 'dark']

    if (!otherThemes[themeName]) {
      otherThemes[themeName] = {}
    }

    otherThemes[themeName]!.colors =
      colors && typeof colors === 'object' ? deepMerge(baseColors, colors) : baseColors

    const baseLayout = extend && (extend === 'light' || extend === 'dark')
      ? baseLayouts[extend]
      : defaultLayoutObj

    otherThemes[themeName]!.layout =
      layout && typeof layout === 'object' ? deepMerge(baseLayout, layout) : baseLayout
  })

  const light: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, themeObject?.light?.layout || {}),
    colors: deepMerge(semanticColors.light, userLightColors),
  }

  const dark: ConfigTheme = {
    layout: deepMerge(baseLayouts.dark, themeObject?.dark?.layout || {}),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  }

  const themes = {
    light,
    dark,
    ...otherThemes,
  }

  return corePlugin(themes, defaultTheme, defaultPrefix, addCommonColors)
}
