import { cn } from "@/lib/utils";
import { PanelActions, type PanelAction } from "@/components/PanelActions/PanelActions";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { PanelLoadingState } from "../PanelLoadingState/PanelLoadingState";
import { PanelErrorState } from "../PanelErrorState/PanelErrorState";

/**
 * MetricCard component
 * 
 * A basic panel that displays summary information. It is the responsibility of the caller 
 * to retieve the data and communicate with this component loading and error state.
 * 
 */
interface MetricCardProps {
    label: string;
    value: string | number;
    change?: {
        value: number | string;
        type: "positive" | "negative" | "neutral";
    };
    icon?: React.ReactNode;
    subtitle?: string;
    className?: string;
    panelActions?: PanelAction[];
    onHidePanel?: () => void;
    onViewDetails?: () => void;
    isLoading?: boolean;
    isError?: boolean;
}

export function MetricCard({
    label,
    value,
    change,
    icon,
    subtitle,
    className,
    panelActions,
    onHidePanel,
    onViewDetails,
    isLoading = false,
    isError = false,
}: MetricCardProps) {
    const changeColor = {
        positive: "text-emerald-400",
        negative: "text-red-400",
        neutral: "text-muted-foreground",
    };

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


    const getContent = () => {
        if (isLoading) {
            return (
                <PanelLoadingState />

            )
        }
        if (isError) {
            return (
                <PanelErrorState />

            )
        }
        return (
            <motion.div
                className="flex items-start justify-between gap-4"
                variants={contentVariants}
            >
                <div className="flex-1" >
                    <p className="metric-label" > {label} </p>
                    < p className="metric-value mt-2" > {value} </p>
                    {
                        subtitle && (
                            <p className="text-xs text-muted-foreground mt-1" > {subtitle} </p>
                        )
                    }
                    {
                        change && (
                            <p
                                className={
                                    cn(
                                        "metric-change",
                                        changeColor[change.type]
                                    )
                                }
                            >
                                {change.type === "positive" && "+"}
                                {change.value}
                            </p>
                        )
                    }
                    {
                        onViewDetails && (
                            <Button
                                onClick={onViewDetails}
                                variant="ghost"
                                size="sm"
                                className="mt-3 h-auto px-0 text-xs text-primary hover:text-primary hover:bg-transparent gap-1"
                            >
                                View Details
                                < ArrowUpRight className="w-3 h-3" />
                            </Button>
                        )
                    }
                </div>
                < div className="flex items-start gap-2 flex-shrink-0" >
                    {icon && (
                        <div className="ml-2 text-primary opacity-50 mt-1" >
                            {icon}
                        </div>
                    )
                    }
                    {
                        (panelActions || onHidePanel) && (
                            <PanelActions
                                actions={panelActions}
                                onHide={onHidePanel}
                            />
                        )
                    }
                </div>
            </motion.div>
        )
    }


    return (
        <motion.div
            className={cn("metric-card", className)}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >

            {getContent()}


        </motion.div>
    );
}
