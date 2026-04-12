import { create } from "zustand";

export type PageType =
  | "dashboard"
  | "traces"
  | "services"
  | "analytics"
  | "settings"
  | "about"
  | "contact"
  | "product"
  | "features"
  | "blog"
  | "blog-article"
  | "forms"
  | "beta-signup"
  | "login"
  | "forgot-password"
  | "layout-editor"
  | "not-found"
  | "beta-learning-center"
  | "beta-contact"
  | "beta-web-experience"
  | "beta-uptime"
  | "beta-debug"
  | "beta-control-panel"
  | "beta-control-panel-cluster-management"
  | "beta-control-panel-customer-management"
  | "beta-control-panel-product-offering"
  | "beta-control-panel-support-tickets";

interface AppState {
  currentPage: PageType;
  isChatModalOpen: boolean;
  setCurrentPage: (page: PageType) => void;
  openChatModal: () => void;
  closeChatModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: "dashboard",
  isChatModalOpen: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  openChatModal: () => set({ isChatModalOpen: true }),
  closeChatModal: () => set({ isChatModalOpen: false }),
}));
