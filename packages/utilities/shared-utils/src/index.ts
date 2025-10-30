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

export function range(start: number, end: number): number[] {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

export function capitalize(str: string): string {
  if (!str || str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function dataAttr(condition: boolean | undefined): string | undefined {
  return condition ? 'true' : undefined
}

export function objectToDeps(obj: Record<string, any>): any[] {
  if (!obj || typeof obj !== 'object') return []
  return Object.keys(obj)
    .sort()
    .map((key) => obj[key])
}

export function chain<T extends (...args: any[]) => any>(
  ...callbacks: (T | undefined)[]
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    callbacks.forEach((callback) => {
      if (typeof callback === 'function') {
        callback(...args)
      }
    })
  }
}

export function mergeProps<T extends Record<string, any>>(
  ...objects: (T | undefined)[]
): T {
  const result: Record<string, any> = {}

  objects.forEach((obj) => {
    if (!obj) return

    Object.keys(obj).forEach((key) => {
      const value = obj[key]

      if (key === 'class' || key === 'className') {
        // Merge class names
        result[key] = [result[key], value].filter(Boolean).join(' ')
      } else if (key.startsWith('on') && typeof value === 'function') {
        // Merge event handlers
        const existing = result[key]
        result[key] = existing
          ? (...args: any[]) => {
            existing(...args)
            value(...args)
          }
          : value
      } else {
        // Later values override earlier ones
        result[key] = value
      }
    })
  })

  return result as T
}

/**
 * Clamps a value between a minimum and maximum value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generates a unique ID with an optional prefix
 */
let idCounter = 0

export function getUniqueID(prefix: string = 'veroui'): string {
  idCounter += 1
  return `${prefix}-${idCounter}-${Date.now()}`
}

/**
 * Alternative implementation using crypto API for better uniqueness
 */
export function getUniqueIDCrypto(prefix: string = 'veroui'): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  // Fallback for environments without crypto.randomUUID
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`
}

/**
 * Generates a deterministic ID based on a seed
 * Useful for SSR where you need consistent IDs between server and client
 */
export function getDeterministicID(prefix: string = 'veroui', seed?: string): string {
  if (seed) {
    // Simple hash function for the seed
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return `${prefix}-${Math.abs(hash)}`
  }
  return getUniqueID(prefix)
}
