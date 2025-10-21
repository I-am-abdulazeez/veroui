/**
 * Part of this code is taken from @chakra-ui/react package, then from HeroUI ❤️
 * Converted to Vue composition API
 */

import { ref, watch, onUnmounted, type Ref } from 'vue'
import { useIsHydrated } from '@veroui/vue-utils'

type NativeImageProps = {
  onLoad?: (event: Event) => void
  onError?: (event: Event | string) => void
  crossOrigin?: string
  loading?: 'eager' | 'lazy'
}

export interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string
  /**
   * The image `srcset` attribute
   */
  srcSet?: string
  /**
   * The image `sizes` attribute
   */
  sizes?: string
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps['onLoad']
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps['onError']
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: NativeImageProps['crossOrigin']
  /**
   * Defines the `loading` attribute for the image
   */
  loading?: NativeImageProps['loading']
  /**
   * If `true`, image load will be bypassed and the load will be handled by `as` component.
   */
  shouldBypassImageLoad?: boolean
}

export type Status = 'loading' | 'failed' | 'pending' | 'loaded'

export type FallbackStrategy = 'onError' | 'beforeLoadOrError'

/**
 * Vue composable that loads an image in the browser,
 * and lets us know the `status` so we can show image
 * fallback if it is still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```vue
 * <script setup>
 * import { useImage } from '@veroui/composables'
 *
 * const status = useImage({ src: 'image.png' })
 * </script>
 *
 * <template>
 *   <img v-if="status === 'loaded'" src="image.png" />
 *   <Placeholder v-else />
 * </template>
 * ```
 */
export function useImage(props: UseImageProps = {}) {
  const {
    onLoad,
    onError,
    ignoreFallback = false,
    src,
    crossOrigin,
    srcSet,
    sizes,
    loading,
    shouldBypassImageLoad = false,
  } = props

  const isHydrated = useIsHydrated()

  const imageRef = ref<HTMLImageElement | null>(null)
  const status = ref<Status>('pending')

  const flush = () => {
    if (imageRef.value) {
      imageRef.value.onload = null
      imageRef.value.onerror = null
      imageRef.value = null
    }
  }

  const load = (): Status => {
    if (!src) return 'pending'
    if (ignoreFallback || shouldBypassImageLoad) return 'loaded'

    flush() // Clean up previous image if any

    const img = new Image()

    img.src = src
    if (crossOrigin) img.crossOrigin = crossOrigin
    if (srcSet) img.srcset = srcSet
    if (sizes) img.sizes = sizes
    if (loading) img.loading = loading

    // Set up event handlers
    img.onload = (event) => {
      status.value = 'loaded'
      onLoad?.(event)
    }

    img.onerror = (error) => {
      status.value = 'failed'
      onError?.(error as any)
    }

    imageRef.value = img

    // Check if image is already loaded (from cache)
    if (img.complete && img.naturalWidth) {
      return 'loaded'
    }

    return 'loading'
  }

  // Watch for changes in src and reload
  watch(
    () => src,
    () => {
      if (isHydrated.value) {
        status.value = load()
      }
    },
    { immediate: true }
  )

  // Clean up on unmount
  onUnmounted(() => {
    flush()
  })

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return ignoreFallback ? ref<Status>('loaded') : status
}

export const shouldShowFallbackImage = (status: Status, fallbackStrategy: FallbackStrategy) =>
  (status !== 'loaded' && fallbackStrategy === 'beforeLoadOrError') ||
  (status === 'failed' && fallbackStrategy === 'onError')

export type UseImageReturn = ReturnType<typeof useImage>
