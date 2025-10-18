export type Size = 'sm' | 'md' | 'lg' | 'xl'
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, string>
}
