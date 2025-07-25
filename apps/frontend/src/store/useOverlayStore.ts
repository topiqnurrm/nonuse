import { create } from "zustand";

interface DialogState {
  isOpen: Record<string, boolean>;
  open: (type: string) => void;
  close: (type: string) => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: {},
  open: (type) =>
    set((state) => ({
      isOpen: { ...state.isOpen, [type]: true },
    })),
  close: (type) =>
    set((state) => ({
      isOpen: { ...state.isOpen, [type]: false },
    })),
}));

export default useDialogStore;
