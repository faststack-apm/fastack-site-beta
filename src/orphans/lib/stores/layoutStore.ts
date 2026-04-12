import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_PANEL_ORDER,
  DEFAULT_DASHBOARD_PANELS,
  LAYOUT_PRESETS,
  type PanelDefinition,
} from "@/lib/constants/dashboardPanels";

export interface LayoutState {
  // Panel ordering and visibility
  panelOrder: string[];
  hiddenPanels: string[];
  currentPreset: string;
  hasUnsavedChanges: boolean;

  // Panel definitions
  panelDefinitions: Map<string, PanelDefinition>;

  // Actions
  setPanelOrder: (order: string[]) => void;
  togglePanelVisibility: (panelId: string) => void;
  showPanel: (panelId: string) => void;
  hidePanel: (panelId: string) => void;
  showAllPanels: () => void;
  hideAllPanels: () => void;

  // Presets
  applyPreset: (presetId: string) => void;
  getCurrentPresetName: () => string;

  // Save/Reset
  saveLayout: () => void;
  resetLayout: () => void;
  resetToPreset: (presetId: string) => void;

  // Getters
  getVisiblePanels: () => PanelDefinition[];
  getPanelDefinition: (panelId: string) => PanelDefinition | undefined;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      panelOrder: DEFAULT_PANEL_ORDER,
      hiddenPanels: [],
      currentPreset: "default",
      hasUnsavedChanges: false,
      panelDefinitions: new Map(
        DEFAULT_DASHBOARD_PANELS.map((p) => [p.id, p]),
      ) as Map<string, PanelDefinition>,

      setPanelOrder: (order: string[]) => {
        set({ panelOrder: order, hasUnsavedChanges: true });
      },

      togglePanelVisibility: (panelId: string) => {
        set((state) => {
          const newHidden = state.hiddenPanels.includes(panelId)
            ? state.hiddenPanels.filter((id) => id !== panelId)
            : [...state.hiddenPanels, panelId];
          return { hiddenPanels: newHidden, hasUnsavedChanges: true };
        });
      },

      showPanel: (panelId: string) => {
        set((state) => ({
          hiddenPanels: state.hiddenPanels.filter((id) => id !== panelId),
          hasUnsavedChanges: true,
        }));
      },

      hidePanel: (panelId: string) => {
        set((state) => {
          if (!state.hiddenPanels.includes(panelId)) {
            return {
              hiddenPanels: [...state.hiddenPanels, panelId],
              hasUnsavedChanges: true,
            };
          }
          return { hasUnsavedChanges: true };
        });
      },

      showAllPanels: () => {
        set({ hiddenPanels: [], hasUnsavedChanges: true });
      },

      hideAllPanels: () => {
        set({
          hiddenPanels: DEFAULT_DASHBOARD_PANELS.map((p) => p.id),
          hasUnsavedChanges: true,
        });
      },

      applyPreset: (presetId: string) => {
        const preset = LAYOUT_PRESETS.find((p) => p.id === presetId);
        if (preset) {
          set({
            panelOrder: preset.panelOrder,
            currentPreset: presetId,
            hasUnsavedChanges: true,
          });
        }
      },

      getCurrentPresetName: () => {
        const preset = LAYOUT_PRESETS.find((p) => p.id === get().currentPreset);
        return preset?.name || "Custom Layout";
      },

      saveLayout: () => {
        set({ hasUnsavedChanges: false });
        // In production, this would also send to API
      },

      resetLayout: () => {
        set({
          panelOrder: DEFAULT_PANEL_ORDER,
          hiddenPanels: [],
          currentPreset: "default",
          hasUnsavedChanges: false,
        });
      },

      resetToPreset: (presetId: string) => {
        const preset = LAYOUT_PRESETS.find((p) => p.id === presetId);
        if (preset) {
          set({
            panelOrder: preset.panelOrder,
            hiddenPanels: [],
            currentPreset: presetId,
            hasUnsavedChanges: false,
          });
        }
      },

      getVisiblePanels: () => {
        const state = get();
        return state.panelOrder
          .filter((id) => !state.hiddenPanels.includes(id))
          .map((id) => state.panelDefinitions.get(id))
          .filter((p) => p !== undefined) as PanelDefinition[];
      },

      getPanelDefinition: (panelId: string) => {
        return get().panelDefinitions.get(panelId);
      },
    }),
    {
      name: "dashboard-layout-storage",
      version: 1,
      serialize: (state) => {
        const { panelDefinitions, ...rest } = state;
        return JSON.stringify(rest);
      },
      deserialize: (str) => {
        const state = JSON.parse(str);
        return {
          ...state,
          hiddenPanels: Array.isArray(state.hiddenPanels)
            ? state.hiddenPanels
            : [],
          panelDefinitions: new Map(
            DEFAULT_DASHBOARD_PANELS.map((p) => [p.id, p]),
          ),
        };
      },
    },
  ),
);
