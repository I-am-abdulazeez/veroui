// Types
export * from './types'
export type { ProviderContextProps } from './provider-context'
export type { VeroUIProviderProps } from './provider'

// Context
export {
  VEROUI_PROVIDER_KEY,
  defaultProviderContext,
} from './provider-context'

// Provider
export { VeroUIPlugin, createVeroUI } from './provider'
export { VeroUIProvider } from './components/veroui-provider'

// Composables
export * from './composables'

// Utils
export {
  toIterator,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  isVeroUIComponent,
} from './utils/props-variants'

// Re-export tailwind-variants
export { tv } from 'tailwind-variants'
export type { VariantProps as TVVariantProps } from 'tailwind-variants'
