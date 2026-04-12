import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import type { PanelDefinition } from "@/lib/constants/dashboardPanels";

interface DraggablePanelPlaceholderProps {
    panel: PanelDefinition;
    isHidden?: boolean;
    onToggleVisibility?: (panelId: string) => void;
}

const getCategoryColor = (
    category: PanelDefinition["category"]
): string => {
    switch (category) {
        case "metric":
            return "border-blue-400/30 bg-blue-400/5";
        case "chart":
            return "border-cyan-400/30 bg-cyan-400/5";
        case "status":
            return "border-emerald-400/30 bg-emerald-400/5";
        case "list":
            return "border-amber-400/30 bg-amber-400/5";
        case "grid":
            return "border-purple-400/30 bg-purple-400/5";
        case "ai":
            return "border-pink-400/30 bg-pink-400/5";
        default:
            return "border-border/40 bg-muted/5";
    }
};

const getCategoryBadgeColor = (
    category: PanelDefinition["category"]
): string => {
    switch (category) {
        case "metric":
            return "bg-blue-400/20 text-blue-300 border-blue-400/30";
        case "chart":
            return "bg-cyan-400/20 text-cyan-300 border-cyan-400/30";
        case "status":
            return "bg-emerald-400/20 text-emerald-300 border-emerald-400/30";
        case "list":
            return "bg-amber-400/20 text-amber-300 border-amber-400/30";
        case "grid":
            return "bg-purple-400/20 text-purple-300 border-purple-400/30";
        case "ai":
            return "bg-pink-400/20 text-pink-300 border-pink-400/30";
        default:
            return "bg-muted/20 text-muted-foreground border-border";
    }
};

const getIcon = (iconName?: string) => {
    if (!iconName) return null;

    const Icons = LucideIcons as any;
    const IconComponent = Icons[iconName];

    if (!IconComponent || typeof IconComponent !== "function") return null;

    return <IconComponent className="w-5 h-5" />;
};

const formatCategory = (category: string): string => {
    return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const DraggablePanelPlaceholder: React.FC<
    DraggablePanelPlaceholderProps
> = ({ panel, isHidden = false, onToggleVisibility }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: panel.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "glass-panel rounded-xl border-2 p-6 transition-all duration-200",
                getCategoryColor(panel.category),
                isDragging && "shadow-2xl ring-2 ring-primary",
                isHidden && "opacity-50"
            )}
        >
            {/* Grab Handle */}
            <div
                {...attributes}
                {...listeners}
                className="flex items-center gap-3 mb-4 cursor-grab active:cursor-grabbing select-none"
            >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 6a2 2 0 11-4 0 2 2 0 014 0zM10 12a2 2 0 11-4 0 2 2 0 014 0zM10 18a2 2 0 11-4 0 2 2 0 014 0zM15 6a2 2 0 11-4 0 2 2 0 014 0zM15 12a2 2 0 11-4 0 2 2 0 014 0zM15 18a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Drag to reorder
                </span>
            </div>

            {/* Panel Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {panel.title}
                    </h3>
                    {panel.description && (
                        <p className="text-xs text-muted-foreground mb-3">
                            {panel.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                                getCategoryBadgeColor(panel.category)
                            )}
                        >
                            {getIcon(panel.icon)}
                            {formatCategory(panel.category)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {panel.defaultWidth}×{panel.defaultHeight}
                        </span>
                    </div>
                </div>
            </div>

            {/* Panel Size Indicator */}
            <div className="mt-4 pt-4 border-t border-border/20">
                <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: panel.defaultHeight }).map((_, rowIdx) => (
                        <React.Fragment key={rowIdx}>
                            {Array.from({ length: panel.defaultWidth }).map((_, colIdx) => (
                                <div
                                    key={`${rowIdx}-${colIdx}`}
                                    className="aspect-square rounded bg-muted/20 border border-border/30 hover:bg-muted/40 transition-colors"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Visibility Toggle */}
            {onToggleVisibility && (
                <button
                    onClick={() => onToggleVisibility(panel.id)}
                    className={cn(
                        "mt-4 w-full px-3 py-2 rounded-md text-xs font-medium transition-colors",
                        isHidden
                            ? "bg-muted/20 text-muted-foreground hover:bg-muted/40"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                >
                    {isHidden ? "Show Panel" : "Hide Panel"}
                </button>
            )}
        </div>
    );
};
