import { create } from 'zustand'

interface DialogState {
  open: boolean,
  update: (by: boolean) => void
}

export const useDialogStore = create<DialogState>()((set)=>({
    open: false,
    update: (by)=> set((state)=> ({open: by}))
}))

  // const [tab, setTab] = useState("info");

  // const onTabChange = (value: string) => {
  //   setTab(value);
  // };


// used for switching tabs in the admin/pwd add pwd dialog
 interface TabState{
  tab: string,
  setTab: (by: string)=>void
 } 
 export const useTabStore = create<TabState>()((set)=>({
  tab: 'info',
  setTab: (by)=> set((state)=>({tab: by}))
 }))


// pwdNumber
 interface PwdNumberState{
  pwdNumber: string | null | undefined,
  setPwdNumber: (by: string) => void
 }
  export const usePwdNumberStore = create<PwdNumberState>()((set)=>({
  pwdNumber: null,
  setPwdNumber: (by)=> set((state)=>({pwdNumber: by}))
 }))