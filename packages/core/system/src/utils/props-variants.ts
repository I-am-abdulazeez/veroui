/**
 * Utility functions for working with component props and variants
 * Adapted from HeroUI for Vue
 */

/**
 * Convert an object to an iterable
 */
export const toIterator = (obj: any) => {
  return {
    ...obj,
    [Symbol.iterator]: function () {
      const keys = Object.keys(this)
      let index = 0

      return {
        next: () => {
          if (index >= keys.length) {
            return { done: true, value: undefined }
          }
          const key = keys[index]
          const value = this[key]
          index++

          return { value: { key, value }, done: false }
        },
      }
    },
  }
}

/**
 * Separates variant props from other props
 * @param props - All component props
 * @param variantKeys - Keys that are variant props
 * @param removeVariantProps - Whether to remove variant props from the first returned object
 * @returns A tuple of [non-variant props, variant props]
 */
export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}]
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] }
    } else {
      return acc
    }
  }, {})

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {})

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>]
  } else {
    return [props, picked] as [T, Pick<T, K>]
  }
}

/**
 * Separates props into base props, variant props, and common props
 * Common props are included in both base and variant props
 * @param originalProps - All component props
 * @param variantKeys - Keys that are variant props
 * @param commonKeys - Keys that should be in both base and variant props
 * @returns A tuple of [base props with common props, variant props]
 */

export const mapPropsVariantsWithCommon = <P extends Record<any, any>,
  VK extends keyof P,
  CK extends keyof P = never>(
    originalProps: P,
    variantKeys: VK[],
    commonKeys?: CK[]
  ) => {
  const props = Object.keys(originalProps)
    .filter((key) => !variantKeys.includes(key as VK) || commonKeys?.includes(key as CK))
    .reduce((acc, key) => ({ ...acc, [key]: originalProps[key as keyof P] }), {}) as Omit<P, Exclude<VK, CK>>

  const variants = variantKeys.reduce(
    (acc, key) => ({ ...acc, [key]: originalProps[key] }),
    {}
  ) as Pick<P, VK>

  return [props, variants] as const
}

/**
 * Checks if a component is a VeroUI component.
 * In Vue, we check for the component name or a custom veroui flag
 * @param component - The component to check
 * @returns `true` if the component is a VeroUI component, `false` otherwise
 */
export const isVeroUIComponent = (component: any): boolean => {
  if (!component) return false

  // Check if component has veroui marker
  if (component.__veroui) return true

  // Check component name
  const name = component.name || component.__name
  if (name && typeof name === 'string') {
    return name.toLowerCase().includes('veroui') || name.startsWith('V')
  }

  return false
}
