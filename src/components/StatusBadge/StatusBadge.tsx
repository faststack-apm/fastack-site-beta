import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "success" | "warning" | "error" | "info" | "neutral";
    label: string;
    icon?: React.ReactNode;
    className?: string;
}

export function StatusBadge({
    status,
    label,
    icon,
    className,
}: StatusBadgeProps) {
    const statusClasses = {
        success:
            "status-success bg-emerald-500/20 text-emerald-100 border-emerald-500/30",
        warning:
            "status-warning bg-amber-500/20 text-amber-100 border-amber-500/30",
        error: "status-error bg-red-500/20 text-red-100 border-red-500/30",
        info: "status-info bg-blue-500/20 text-blue-100 border-blue-500/30",
        neutral: "bg-muted/50 text-muted-foreground border-border",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm",
                statusClasses[status],
                className
            )}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{label}</span>
        </div>
    );
}
