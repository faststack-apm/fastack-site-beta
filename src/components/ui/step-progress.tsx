import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProgressProps {
  steps: string[];
  currentStep: number; // 0-indexed
  className?: string;
}

export const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({ steps, currentStep, className }, ref) => {
    // Clamp currentStep between 0 and steps.length - 1
    const clampedStep = Math.min(Math.max(currentStep, 0), steps.length - 1);

    // Calculate progress percentage
    const progressPercentage =
      steps.length > 1 ? (clampedStep / (steps.length - 1)) * 100 : 0;

    return (
      <div ref={ref} className={cn("w-full space-y-4", className)}>
        {/* Progress Bar with Steps */}
        <div className="space-y-2">
          {/* Visual Progress Bar */}
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const isCompleted = index < clampedStep;
              const isCurrent = index === clampedStep;
              const isUpcoming = index > clampedStep;

              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  {/* Dot Indicator */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 mb-2",
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-500 text-white ring-2 ring-blue-300/50"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={cn(
                      "text-xs text-center max-w-16 transition-colors duration-300",
                      isCompleted || isCurrent
                        ? "text-foreground font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Label */}
        <div className="text-sm text-muted-foreground text-center">
          Step {clampedStep + 1} of {steps.length}:{" "}
          <span className="font-semibold text-foreground">
            {steps[clampedStep]}
          </span>
        </div>
      </div>
    );
  },
);

StepProgress.displayName = "StepProgress";

export default StepProgress;
