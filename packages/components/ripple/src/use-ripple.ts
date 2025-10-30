import { ref, type Ref } from 'vue'
import { getUniqueID } from '@veroui/shared-utils'
import { RippleType } from './types'

export interface UseRippleProps { }

export function useRipple(_props: UseRippleProps = {}) {
  const ripples: Ref<RippleType[]> = ref([])

  const onPress = (event: MouseEvent) => {
    const trigger = event.currentTarget as HTMLElement
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const size = Math.max(trigger.clientWidth, trigger.clientHeight)

    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripples.value = [
      ...ripples.value,
      {
        key: getUniqueID(ripples.value.length.toString()),
        size,
        x,
        y,
      },
    ]
  }

  const onClear = (key: string) => {
    ripples.value = ripples.value.filter((ripple) => ripple.key !== key)
  }

  return {
    ripples,
    onClear,
    onPress,
  }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
