import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";

interface PanelErrorStateProps {
    title?: string;
    message?: string;
    errorCode?: string;
    onRetry?: () => void;
    showRetryButton?: boolean;
}

export const PanelErrorState: React.FC<PanelErrorStateProps> = ({
    title = "Unable to Load",
    message = "An error occurred while loading this panel. Please try again.",
    errorCode = "500",
    onRetry,
    showRetryButton = true,
}) => {
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
            className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded-lg"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background gradient - error themed */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />

            {/* Animated error pulse background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    background: `radial-gradient(circle at center, hsl(0, 84%, 60%) 0%, transparent 70%)`,
                    animation: "pulse 3s ease-in-out infinite",
                }}
            />

            {/* Error content */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-4"
                variants={contentVariants}
            >
                {/* Error Icon with animation */}
                <div className="relative">
                    <div
                        className="absolute inset-0 rounded-full bg-error/20 blur-xl"
                        style={{
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    />
                    <AlertCircle className="w-16 h-16 text-error relative" />
                </div>

                {/* Error information */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 max-w-xs">
                        {message}
                    </p>
                    {errorCode && (
                        <p className="text-xs text-error font-mono bg-error/10 px-3 py-1 rounded inline-block mb-4">
                            Error Code: {errorCode}
                        </p>
                    )}
                </div>

                {/* Retry button */}
                {showRetryButton && (
                    <Button
                        onClick={onRetry}
                        variant="outline"
                        size="sm"
                        className="gap-2 border-error/30 hover:border-error hover:bg-error/10"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </Button>
                )}
            </motion.div>
        </motion.div>
    );
};
