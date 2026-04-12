import React, { useState } from "react";
import { Server, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServerRowProps {
  serverId: string;
  hostname: string;
  onLabelChange?: (serverId: string, label: string) => void;
  onRemove?: (serverId: string) => void;
}

export const ServerRow: React.FC<ServerRowProps> = ({
  serverId,
  hostname,
  onLabelChange,
  onRemove,
}) => {
  const [label, setLabel] = useState("");
  const hasLabel = label.trim().length > 0;

  const handleLabelChange = (value: string) => {
    setLabel(value);
    onLabelChange?.(serverId, value);
  };

  const handleClearLabel = () => {
    setLabel("");
    onLabelChange?.(serverId, "");
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg transition-all duration-300 border border-transparent",
        hasLabel
          ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30"
          : "bg-muted/30 hover:bg-muted/50",
      )}
    >
      {/* Server Icon */}
      <div
        className={cn(
          "flex-shrink-0 p-2.5 rounded-lg transition-colors duration-300",
          hasLabel
            ? "bg-blue-500/20 text-blue-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        <Server className="w-5 h-5" />
      </div>

      {/* Server Info */}
      <div className="flex-1 min-w-0">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Hostname</p>
          <p className="text-sm font-mono text-foreground truncate">
            {hostname}
          </p>
        </div>
      </div>

      {/* Label Input */}
      <div className="flex-1 min-w-0">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Custom Label</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter friendly name..."
              value={label}
              onChange={(e) => handleLabelChange(e.target.value)}
              className={cn(
                "h-8 text-sm",
                hasLabel
                  ? "border-blue-500/50 bg-blue-500/5 focus:border-blue-500"
                  : "",
              )}
            />
            {hasLabel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearLabel}
                className="h-8 px-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove?.(serverId)}
        className="flex-shrink-0 h-8 px-2"
        title="Remove server"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ServerRow;
