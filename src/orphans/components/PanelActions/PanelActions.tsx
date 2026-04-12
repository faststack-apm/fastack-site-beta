import React from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export interface PanelAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
  separator?: boolean;
}

interface PanelActionsProps {
  actions?: PanelAction[];
  onHide?: () => void;
}

export const PanelActions: React.FC<PanelActionsProps> = ({
  actions = [],
  onHide,
}) => {
  if (actions.length === 0 && !onHide) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-blue-500/10"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          <span className="sr-only">Open panel menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {actions.length > 0 && (
          <>
            {actions.map((action, index) => (
              <React.Fragment key={action.id}>
                {action.separator && index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={action.onClick}
                  className={
                    action.variant === "destructive"
                      ? "text-error focus:bg-error/10 focus:text-error cursor-pointer"
                      : "cursor-pointer"
                  }
                >
                  {action.icon && (
                    <span className="mr-2 h-4 w-4">{action.icon}</span>
                  )}
                  {action.label}
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </>
        )}

        {onHide && actions.length > 0 && <DropdownMenuSeparator />}

        {onHide && (
          <DropdownMenuItem
            onClick={onHide}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Hide panel
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
