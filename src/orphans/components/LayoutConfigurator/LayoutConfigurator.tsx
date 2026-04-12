import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggablePanelPlaceholder } from "@/components/DraggablePanelPlaceholder/DraggablePanelPlaceholder";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { DEFAULT_DASHBOARD_PANELS } from "@/lib/constants/dashboardPanels";
import { cn } from "@/lib/utils";

interface LayoutConfiguratorProps {
    className?: string;
    onOrderChange?: (newOrder: string[]) => void;
}

export const LayoutConfigurator: React.FC<LayoutConfiguratorProps> = ({
    className,
    onOrderChange,
}) => {
    const { panelOrder, setPanelOrder, hiddenPanels, togglePanelVisibility } =
        useLayoutStore();

    // Ensure hiddenPanels is always an array
    const safeHiddenPanels = Array.isArray(hiddenPanels) ? hiddenPanels : [];

    // Create a working copy of panel order for dragging
    const [activeOrder, setActiveOrder] = useState<string[]>(panelOrder);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = activeOrder.indexOf(active.id as string);
            const newIndex = activeOrder.indexOf(over.id as string);

            const newOrder = arrayMove(activeOrder, oldIndex, newIndex);
            setActiveOrder(newOrder);
            setPanelOrder(newOrder);

            if (onOrderChange) {
                onOrderChange(newOrder);
            }
        }
    };

    const getPanelById = (panelId: string) => {
        return DEFAULT_DASHBOARD_PANELS.find((p) => p.id === panelId);
    };

    const getGridColSpan = (panelWidth: number) => {
        // Map panel width units to Tailwind grid column span
        // defaultWidth: 4 -> full width (col-span-full)
        // defaultWidth: 2 -> half width (lg:col-span-2)
        // defaultWidth: 1 -> quarter width (lg:col-span-1)
        switch (panelWidth) {
            case 4:
                return "col-span-full";
            case 3:
                return "lg:col-span-3 md:col-span-2 col-span-1";
            case 2:
                return "lg:col-span-2 md:col-span-2 col-span-1";
            case 1:
            default:
                return "lg:col-span-1 md:col-span-1 col-span-1";
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className={cn("w-full", className)}>
                <SortableContext
                    items={activeOrder}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeOrder.map((panelId) => {
                            const panel = getPanelById(panelId);

                            if (!panel) return null;

                            const isHidden = safeHiddenPanels.includes(panelId);

                            return (
                                <div
                                    key={panelId}
                                    className={cn(
                                        "transition-opacity duration-200",
                                        getGridColSpan(panel.defaultWidth),
                                        {
                                            "opacity-50": isHidden,
                                        },
                                    )}
                                >
                                    <DraggablePanelPlaceholder
                                        panel={panel}
                                        isHidden={isHidden}
                                        onToggleVisibility={togglePanelVisibility}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </SortableContext>
            </div>

            {/* Empty State */}
            {activeOrder.length === 0 && (
                <div className="glass-panel p-12 rounded-xl text-center">
                    <p className="text-muted-foreground">
                        No panels available. Reset layout to restore default panels.
                    </p>
                </div>
            )}

            {/* Hidden Panels Info */}
            {safeHiddenPanels.length > 0 && (
                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        {safeHiddenPanels.length} panel
                        {safeHiddenPanels.length > 1 ? "s" : ""} hidden from the layout.
                        Click "Show Panel" to restore them.
                    </p>
                </div>
            )}
        </DndContext>
    );
};
