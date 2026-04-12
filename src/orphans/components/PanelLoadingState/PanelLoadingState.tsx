import React from "react";
import { motion, type Variants } from "framer-motion";

interface PanelLoadingStateProps {
    title?: string;
    message?: string;
    animated?: boolean;
}

export const PanelLoadingState: React.FC<PanelLoadingStateProps> = ({
    title = "Loading",
    message = "Please wait while we fetch your data...",
    animated = true,
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
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />

            {/* Animated radial pulse background */}
            {animated && (
                <>
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `radial-gradient(circle at center, hsl(207, 89%, 50%) 0%, transparent 70%)`,
                            animation: "pulse-radial 2s ease-in-out infinite",
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            background: `radial-gradient(circle at center, hsl(207, 89%, 50%) 0%, transparent 70%)`,
                            animation: "pulse-radial 2s ease-in-out infinite 0.5s",
                        }}
                    />
                </>
            )}

            {/* Center spinner circle */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-4"
                variants={contentVariants}
            >
                {/* SVG Spinner */}
                <div className="relative w-16 h-16">
                    <svg
                        className="w-full h-full animate-spin"
                        viewBox="0 0 50 50"
                        style={{ animationDuration: "3s" }}
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                            className="text-primary"
                        />
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="url(#gradient-spinner)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="31.4 125.6"
                            className="text-primary"
                            style={{
                                filter: "drop-shadow(0 0 4px hsl(207, 89%, 50%))",
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient-spinner">
                                <stop offset="0%" stopColor="hsl(207, 89%, 50%)" />
                                <stop offset="100%" stopColor="hsl(207, 89%, 50%)" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Inner pulsing dot */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        }}
                    >
                        <div className="w-2 h-2 rounded-full bg-primary opacity-60" />
                    </div>
                </div>

                {/* Text content */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>
            </motion.div>

            {/* Add CSS animation keyframes */}
            <style>{`
        @keyframes pulse-radial {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
      `}</style>
        </motion.div>
    );
};
