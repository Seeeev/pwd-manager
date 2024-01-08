import { create } from 'zustand'

interface DialogState {
  open: boolean,
  update: (by: boolean) => void
}

export const useDialogStore = create<DialogState>()((set)=>({
    open: false,
    update: (by)=> set((state)=> ({open: by}))
}))