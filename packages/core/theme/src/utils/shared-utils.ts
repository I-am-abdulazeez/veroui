// since we don't have @heroui/shared-utils
export const omit = <T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> => {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

export const kebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const mapKeys = <T extends Record<string, any>>(
  obj: T,
  fn: (value: any, key: string) => string
): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[fn(obj[key], key)] = obj[key]
    return acc
  }, {} as Record<string, any>)
}
