import type { AllowedComponentProps, Component, VNodeProps } from 'vue'

/**
 * Vue component types
 */

/**
 * Extract props from a Vue component
 */
export type PropsOf<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

/**
 * Merge two types with the second overriding the first
 */
export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N

/**
 * Omit common props that might conflict
 */
export type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<
  Target,
  'transition' | 'as' | 'color' | OmitAdditionalProps
>

/**
 * Props getter type for composables
 */
export type PropGetter<P = Record<string, unknown>, R = Record<string, any>> = (
  props?: Merge<Record<string, any>, P>,
) => R

/**
 * HTML VeroUI props - base props for all VeroUI components
 */
export type HTMLVeroUIProps
  <T extends keyof HTMLElementTagNameMap = 'div',
    OmitKeys extends keyof any = never,
  > = Omit<
    AllowedComponentProps & VNodeProps,
    'ref' | 'color' | 'slot' | 'size' | OmitKeys
  > & {
    as?: T | Component
    class?: string
  }

/**
 * Data attributes type
 */
export type DataAttributes = {
  [dataAttr: `data-${string}`]: any
}

/**
 * DOM attributes for Vue
 */
export type DOMAttributes<T = HTMLElement> = DataAttributes & {
  id?: string
  role?: string
  tabIndex?: number
  style?: string | Record<string, string | number>
  class?: string
  // ARIA attributes
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  'aria-disabled'?: boolean | 'true' | 'false'
  'aria-expanded'?: boolean | 'true' | 'false'
  'aria-selected'?: boolean | 'true' | 'false'
  'aria-checked'?: boolean | 'true' | 'false' | 'mixed'
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed'
  'aria-invalid'?: boolean | 'true' | 'false'
  'aria-required'?: boolean | 'true' | 'false'
  'aria-readonly'?: boolean | 'true' | 'false'
  'aria-live'?: 'polite' | 'assertive' | 'off'
  'aria-atomic'?: boolean | 'true' | 'false'
  'aria-busy'?: boolean | 'true' | 'false'
  'aria-relevant'?: string
  'aria-controls'?: string
  'aria-owns'?: string
  'aria-haspopup'?: boolean | 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  [key: `aria-${string}`]: any
}
