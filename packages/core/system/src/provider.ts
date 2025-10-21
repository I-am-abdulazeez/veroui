import type { App, Plugin } from 'vue'
import type { ProviderContextProps } from './provider-context'
import { provideVeroUI } from './composables/use-provider'

export interface VeroUIProviderProps extends ProviderContextProps {
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: string
}

/**
 * VeroUI Plugin for Vue
 * Install globally: app.use(VeroUIPlugin, options)
 */
export const VeroUIPlugin: Plugin = {
  install(app: App, options: VeroUIProviderProps = {}) {
    const {
      locale = 'en-US',
      disableAnimation = false,
      disableRipple = false,
      labelPlacement,
      validationBehavior,
      defaultDates,
      createCalendar,
      spinnerVariant = 'default',
    } = options

    // Store locale in app config
    app.config.globalProperties.$veroui = {
      locale,
    }

    // Provide VeroUI context at app level
    app.provide('veroui-config', {
      disableAnimation,
      disableRipple,
      labelPlacement,
      validationBehavior,
      defaultDates,
      createCalendar,
      spinnerVariant,
    })
  },
}

/**
 * Get VeroUI plugin with custom options
 * @example
 * ```ts
 * import { createVeroUI } from '@veroui/system'
 *
 * const veroui = createVeroUI({
 *   disableAnimation: false,
 *   locale: 'en-US'
 * })
 *
 * app.use(veroui)
 * ```
 */
export function createVeroUI(options: VeroUIProviderProps = {}): Plugin {
  return {
    install(app: App) {
      VeroUIPlugin.install?.(app, options)
    },
  }
}
