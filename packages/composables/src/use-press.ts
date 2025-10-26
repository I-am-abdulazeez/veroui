import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UsePressProps {
  /** Whether the press events are disabled. */
  isDisabled?: boolean
  /** Handler called when the press is released over the target. */
  onPress?: (e: PointerEvent) => void
  /** Handler called when a press interaction starts. */
  onPressStart?: (e: PointerEvent) => void
  /** Handler called when a press interaction ends, either over the target or when moved off. */
  onPressEnd?: (e: PointerEvent) => void
  /** Handler called when the press state changes. */
  onPressChange?: (isPressed: boolean) => void
}

export interface PressResult {
  /** Props to spread onto the target element. */
  pressProps: Ref<Record<string, any>>
  /** Whether the target is currently pressed. */
  isPressed: Ref<boolean>
}

/**
 * Handles press interactions across mouse, touch, and keyboard.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { usePress } from '@veroui/composables'
 *
 * const buttonRef = ref<HTMLElement>()
 * const { pressProps, isPressed } = usePress({
 *   onPress: () => console.log('Pressed!')
 * }, buttonRef)
 * </script>
 *
 * <template>
 *   <button ref="buttonRef" v-bind="pressProps">
 *     {{ isPressed ? 'Pressed' : 'Press me' }}
 *   </button>
 * </template>
 * ```
 */
export function usePress(
  props: UsePressProps,
  elementRef: Ref<HTMLElement | null>
): PressResult {
  const { isDisabled, onPress, onPressStart, onPressEnd, onPressChange } = props

  const isPressed = ref(false)

  const setPressed = (pressed: boolean) => {
    if (isPressed.value === pressed) return

    isPressed.value = pressed
    onPressChange?.(pressed)
  }

  const handlePressStart = (e: PointerEvent) => {
    if (isDisabled) return

    setPressed(true)
    onPressStart?.(e)
  }

  const handlePressEnd = (e: PointerEvent) => {
    if (isDisabled) return

    const wasPressed = isPressed.value
    setPressed(false)
    onPressEnd?.(e)

    // Only trigger onPress if we're ending a press over the target
    if (wasPressed && elementRef.value?.contains(e.target as Node)) {
      onPress?.(e)
    }
  }

  const handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return // Only handle left clicks
    handlePressStart(e)
  }

  const handlePointerUp = (e: PointerEvent) => {
    handlePressEnd(e)
  }

  const handleClick = (e: MouseEvent) => {
    if (isDisabled) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Keyboard support
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDisabled) return
    if (e.key !== 'Enter' && e.key !== ' ') return
    if (e.repeat) return

    e.preventDefault()
    setPressed(true)
    onPressStart?.(e as any)
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (isDisabled) return
    if (e.key !== 'Enter' && e.key !== ' ') return

    e.preventDefault()
    setPressed(false)
    onPressEnd?.(e as any)
    onPress?.(e as any)
  }

  const pressProps = ref({
    onPointerdown: handlePointerDown,
    onPointerup: handlePointerUp,
    onClick: handleClick,
    onKeydown: handleKeyDown,
    onKeyup: handleKeyUp,
  })

  // Global pointer up to handle press ending outside element
  const handleGlobalPointerUp = (e: PointerEvent) => {
    if (isPressed.value) {
      handlePressEnd(e)
    }
  }

  onMounted(() => {
    document.addEventListener('pointerup', handleGlobalPointerUp)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerup', handleGlobalPointerUp)
    setPressed(false)
  })

  return {
    pressProps,
    isPressed,
  }
}

export type UsePressReturn = ReturnType<typeof usePress>
