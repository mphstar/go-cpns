import React from "react";
import { create } from "zustand";

type AdminStore = {
    title: string;
    setTitle: (title: string) => void;
    showSidebar: boolean;
    handleSidebar: () => void;

    sidebarCollapsed: boolean;
    handleSidebarCollapsed: () => void;
    titleModal: string;
    setTitleModal: (titleModal: string) => void;
    descriptionModal: string;
    setDescriptionModal: (descriptionModal: string) => void;
    bodyModal: React.ReactNode;
    setBodyModal: (bodyModal: React.ReactNode) => void;
    isOpenModal: boolean;
    setIsOpenModal: (isOpenModal: boolean) => void;
    reset: () => void;
};

const useAdminStore = create<AdminStore>((set) => ({
    title: "",
    setTitle: (title) => set({ title }),

    showSidebar: false,
    handleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),

    sidebarCollapsed: true,
    handleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    titleModal: "",
    setTitleModal: (titleModal) => set({ titleModal }),
    descriptionModal: "",
    setDescriptionModal: (descriptionModal) => set({ descriptionModal }),
    bodyModal: "",
    setBodyModal: (bodyModal) => set({ bodyModal }),
    isOpenModal: false,
    setIsOpenModal: (isOpenModal) => set({ isOpenModal }),

    reset: () =>
        set({
            title: "",
            showSidebar: false,
            titleModal: "",
            descriptionModal: "",
            bodyModal: "",
            isOpenModal: false,
        }),
}));

export default useAdminStore;
