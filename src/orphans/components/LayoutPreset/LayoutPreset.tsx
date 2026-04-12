import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { LAYOUT_PRESETS } from "@/lib/constants/dashboardPanels";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutPresetProps {
    className?: string;
    onPresetApply?: (presetId: string) => void;
}

export const LayoutPreset: React.FC<LayoutPresetProps> = ({
    className,
    onPresetApply,
}) => {
    const { currentPreset, applyPreset, getCurrentPresetName, resetToPreset } =
        useLayoutStore();

    const handlePresetChange = (presetId: string) => {
        applyPreset(presetId);
        if (onPresetApply) {
            onPresetApply(presetId);
        }
    };

    const handleResetToPreset = () => {
        resetToPreset(currentPreset);
        if (onPresetApply) {
            onPresetApply(currentPreset);
        }
    };

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                    Dashboard Template
                </label>
                <Select value={currentPreset} onValueChange={handlePresetChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a template..." />
                    </SelectTrigger>
                    <SelectContent>
                        {LAYOUT_PRESETS.map((preset) => (
                            <SelectItem key={preset.id} value={preset.id}>
                                <div>
                                    <div className="font-medium">{preset.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {preset.description}
                                    </div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={handleResetToPreset}
                className="flex items-center gap-2 h-10"
                title="Reset this template to default configuration"
            >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset Template</span>
            </Button>
        </div>
    );
};
