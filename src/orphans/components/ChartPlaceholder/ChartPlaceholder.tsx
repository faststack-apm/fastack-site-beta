import { cn } from "@/lib/utils";
import { PanelActions, type PanelAction } from "@/components/PanelActions/PanelActions";
import { motion, type Variants } from "framer-motion";

interface ChartPlaceholderProps {
    title?: string;
    className?: string;
    height?: string;
    panelActions?: PanelAction[];
    onHidePanel?: () => void;
}

export function ChartPlaceholder({
    title,
    className,
    height = "h-64",
    panelActions,
    onHidePanel,
}: ChartPlaceholderProps) {
    const containerVariants: Variants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.2 },
        },
    };

    return (
        <motion.div
            className={cn(
                "glass-panel p-6 rounded-xl bg-gradient-to-br from-muted/30 to-card/30 relative",
                height,
                className
            )}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Panel Actions - Top Right */}
            {(panelActions || onHidePanel) && (
                <div className="absolute top-4 right-4 z-10">
                    <PanelActions
                        actions={panelActions}
                        onHide={onHidePanel}
                    />
                </div>
            )}

            {/* Chart Content */}
            <motion.div
                className="flex flex-col items-center justify-center h-full"
                variants={contentVariants}
            >
                {/* Animated bars simulation */}
                <div className="flex items-end gap-1 mb-4 h-16">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 bg-gradient-to-t from-primary to-accent rounded-sm opacity-60",
                                i % 3 === 0 && "animate-pulse"
                            )}
                            style={{
                                height: `${30 + Math.sin(i * 0.5) * 20}%`,
                            }}
                        />
                    ))}
                </div>
                {title && <p className="text-xs text-muted-foreground">{title}</p>}
            </motion.div>
        </motion.div>
    );
}
