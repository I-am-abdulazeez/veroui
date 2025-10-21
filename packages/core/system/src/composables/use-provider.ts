import { inject, provide, type ComputedRef, computed } from 'vue'
import { VEROUI_PROVIDER_KEY, defaultProviderContext, type ProviderContextProps } from '../provider-context'

/**
 * Composable to provide VeroUI context values
 */
export function provideVeroUI(props: ProviderContextProps) {
  const contextRef = computed(() => props)
  provide(VEROUI_PROVIDER_KEY, contextRef)
}

/**
 * Composable to consume VeroUI context values
 * @returns The provider context with default fallbacks
 */
export function useProviderContext(): ComputedRef<ProviderContextProps> {
  const context = inject(VEROUI_PROVIDER_KEY, null)

  return computed(() => ({
    ...defaultProviderContext,
    ...(context?.value || {}),
  }))
}

/**
 * Get a specific provider value
 */
export function useProviderValue<K extends keyof ProviderContextProps>(
  key: K
): ComputedRef<ProviderContextProps[K]> {
  const context = useProviderContext()
  return computed(() => context.value[key])
}
