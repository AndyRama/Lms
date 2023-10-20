import { create } from 'zustand'

type ConfettiStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => ({ isOpen: true }),
  onClose: () => ({ isOpen: false }),
}))