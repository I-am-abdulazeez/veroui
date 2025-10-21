import { computed, type Ref } from 'vue'
import { useControllableState } from './use-controllable-state'

export interface UseDisclosureProps {
  /**
   * Whether the disclosure is open (controlled)
   */
  isOpen?: Ref<boolean> | boolean
  /**
   * The default open state (uncontrolled)
   */
  defaultOpen?: boolean
  /**
   * Callback fired when the disclosure closes
   */
  onClose?: () => void
  /**
   * Callback fired when the disclosure opens
   */
  onOpen?: () => void
  /**
   * Callback fired when the disclosure state changes
   */
  onChange?: (isOpen: boolean) => void
  /**
   * The id of the disclosure element
   */
  id?: string
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    isOpen: isOpenProp,
    defaultOpen = false,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange,
    id: idProp,
  } = props

  // Generate unique ID
  const generatedId = `disclosure-${Math.random().toString(36).substring(2, 9)}`
  const id = idProp || generatedId

  // Use controllable state pattern
  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultOpen,
    onChange,
  })

  const isControlled = computed(() => isOpenProp !== undefined)

  const onClose = () => {
    if (!isControlled.value) {
      setIsOpen(false)
    }
    onCloseProp?.()
  }

  const onOpen = () => {
    if (!isControlled.value) {
      setIsOpen(true)
    }
    onOpenProp?.()
  }

  const onOpenChange = () => {
    if (isOpen.value) {
      onClose()
    } else {
      onOpen()
    }
  }

  const getButtonProps = (props: Record<string, any> = {}) => ({
    ...props,
    'aria-expanded': isOpen.value,
    'aria-controls': id,
    onClick: (e: Event) => {
      props.onClick?.(e)
      onOpenChange()
    },
  })

  const getDisclosureProps = (props: Record<string, any> = {}) => ({
    ...props,
    hidden: !isOpen.value,
    id,
  })

  return {
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
