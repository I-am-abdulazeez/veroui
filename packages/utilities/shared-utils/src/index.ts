// since we don't have @veroui/shared-utils
export function omit<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

export function kebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function mapKeys<T extends Record<string, any>>(
  obj: T,
  fn: (value: any, key: string) => string
): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    acc[fn(obj[key], key)] = obj[key]
    return acc
  }, {} as Record<string, any>)
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
