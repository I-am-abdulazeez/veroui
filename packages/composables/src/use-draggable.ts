import { ref, onMounted, onUnmounted, computed, type Ref, type CSSProperties } from 'vue'

export interface UseDraggableProps {
  /**
   * Ref to the moving target DOM node.
   */
  targetRef?: Ref<HTMLElement | null>
  /**
   * Whether to disable the target is draggable.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the target can overflow the viewport.
   * @default false
   */
  canOverflow?: boolean
}

export interface MoveEvent {
  deltaX: number
  deltaY: number
  pointerType: string
}

export interface UseDraggableReturn {
  moveProps: {
    onPointerdown: (e: PointerEvent) => void
    style: CSSProperties
  }
}

/**
 * A Vue composable to make a target draggable.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useDraggable } from '@veroui/composables'
 *
 * const targetRef = ref<HTMLElement | null>(null)
 * const { moveProps } = useDraggable({ targetRef })
 * </script>
 *
 * <template>
 *   <div ref="targetRef" v-bind="moveProps">
 *     Drag me!
 *   </div>
 * </template>
 * ```
 *
 * @param props UseDraggableProps
 * @returns Move props and styles for the drag DOM node
 */
export function useDraggable(props: UseDraggableProps): UseDraggableReturn {
  const { targetRef, isDisabled = false, canOverflow = false } = props

  const boundary = ref({ minLeft: 0, minTop: 0, maxLeft: 0, maxTop: 0 })
  const isDragging = ref(false)
  const transform = ref({ offsetX: 0, offsetY: 0 })
  const startPoint = ref({ x: 0, y: 0 })

  const onMoveStart = (e: PointerEvent) => {
    if (isDisabled) return

    isDragging.value = true
    startPoint.value = { x: e.clientX, y: e.clientY }

    const { offsetX, offsetY } = transform.value
    const targetRect = targetRef?.value?.getBoundingClientRect()
    const targetLeft = targetRect?.left ?? 0
    const targetTop = targetRect?.top ?? 0
    const targetWidth = targetRect?.width ?? 0
    const targetHeight = targetRect?.height ?? 0
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    boundary.value = {
      minLeft,
      minTop,
      maxLeft,
      maxTop,
    }

    // Add global listeners for move and end
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onMoveEnd)
    document.addEventListener('pointercancel', onMoveEnd)

    // Capture pointer
    if (targetRef?.value) {
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
  }

  const onMove = (e: PointerEvent) => {
    if (isDisabled || !isDragging.value) return

    const deltaX = e.clientX - startPoint.value.x
    const deltaY = e.clientY - startPoint.value.y

    const { offsetX, offsetY } = transform.value
    const { minLeft, minTop, maxLeft, maxTop } = boundary.value

    let moveX = offsetX + deltaX
    let moveY = offsetY + deltaY

    if (!canOverflow) {
      moveX = Math.min(Math.max(moveX, minLeft), maxLeft)
      moveY = Math.min(Math.max(moveY, minTop), maxTop)
    }

    if (targetRef?.value) {
      targetRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
  }

  const onMoveEnd = () => {
    if (!isDragging.value) return

    isDragging.value = false

    // Update transform with final position
    if (targetRef?.value) {
      const style = targetRef.value.style.transform
      const match = style.match(/translate\((-?\d+(?:\.\d+)?)px,\s*(-?\d+(?:\.\d+)?)px\)/)
      if (match) {
        transform.value = {
          offsetX: parseFloat(match[1]),
          offsetY: parseFloat(match[2]),
        }
      }
    }

    // Remove global listeners
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onMoveEnd)
    document.removeEventListener('pointercancel', onMoveEnd)
  }

  const preventDefault = (e: TouchEvent) => {
    // Only prevent touchmove events if we're actively dragging
    if (isDragging.value) {
      e.preventDefault()
    }
  }

  // NOTE: This process is due to the modal being displayed at the bottom instead of the center when opened on mobile sizes.
  // It will become unnecessary once the modal is centered properly.
  onMounted(() => {
    if (!isDisabled) {
      // Prevent body scroll when dragging at mobile, but only during active dragging.
      document.body.addEventListener('touchmove', preventDefault, { passive: false })
    }
  })

  onUnmounted(() => {
    document.body.removeEventListener('touchmove', preventDefault)
    // Clean up any lingering listeners
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onMoveEnd)
    document.removeEventListener('pointercancel', onMoveEnd)
  })

  const moveProps = computed(() => ({
    onPointerdown: onMoveStart,
    style: {
      cursor: !isDisabled ? 'move' : undefined,
      touchAction: 'none', // Prevent default touch behaviors
    } as CSSProperties,
  }))

  return {
    moveProps: moveProps.value,
  }
}
