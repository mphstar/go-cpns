import { create } from "zustand";

type AdminStore = {
    title: string;
    setTitle: (title: string) => void;
    showSidebar: boolean;
    handleSidebar: () => void;

    sidebarCollapsed: boolean;
    handleSidebarCollapsed: () => void;
};

const useAdminStore = create<AdminStore>((set) => ({
    title: "",
    setTitle: (title) => set({ title }),

    showSidebar: false,
    handleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),

    sidebarCollapsed: true,
    handleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));

export default useAdminStore;
