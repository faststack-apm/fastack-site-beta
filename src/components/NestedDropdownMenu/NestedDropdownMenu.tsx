import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface NestedMenuItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: NestedMenuItem[];
    description?: string;
    onClick?: () => void;
}

interface NestedDropdownMenuProps {
    trigger: React.ReactNode;
    items: NestedMenuItem[];
    align?: "start" | "center" | "end";
}

interface NestedMenuItemsProps {
    items: NestedMenuItem[];
    level?: number;
}

/**
 * Recursive menu item component that handles nested dropdowns
 */
const NestedMenuItems: React.FC<NestedMenuItemsProps> = ({
    items,
    level = 0,
}) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (key: string) => {
        setOpenSubmenu(openSubmenu === key ? null : key);
    };

    return (
        <>
            {items.map((item, index) => {
                const itemKey = `${level}-${index}`;
                const isOpen = openSubmenu === itemKey;

                return (
                    <div key={itemKey} className="relative">
                        {item.children && item.children.length > 0 ? (
                            // Item with submenu
                            <>
                                <button
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md",
                                        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                        "transition-colors",
                                        isOpen && "bg-muted/50 text-foreground",
                                    )}
                                    onClick={() => toggleSubmenu(itemKey)}
                                >
                                    <span className="flex items-center gap-2">
                                        {item.icon && <span className="text-lg">{item.icon}</span>}
                                        <span>{item.label}</span>
                                    </span>
                                    <ChevronRight
                                        className={cn(
                                            "w-4 h-4 transition-transform",
                                            isOpen && "rotate-90",
                                        )}
                                    />
                                </button>

                                {/* Submenu - shown conditionally with proper nesting */}
                                {isOpen && (
                                    <div className="bg-muted/30 border-l border-border/40 ml-2 pl-2 py-1">
                                        <NestedMenuItems items={item.children} level={level + 1} />
                                    </div>
                                )}
                            </>
                        ) : (
                            // Item without submenu - clickable link/button
                            <>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            "block px-3 py-2 text-sm rounded-md",
                                            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                            "transition-colors",
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.icon && (
                                                <span className="text-lg">{item.icon}</span>
                                            )}
                                            <span>{item.label}</span>
                                        </span>
                                    </a>
                                ) : (
                                    <button
                                        className={cn(
                                            "w-full text-left px-3 py-2 text-sm rounded-md",
                                            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                            "transition-colors",
                                        )}
                                        onClick={item.onClick}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.icon && (
                                                <span className="text-lg">{item.icon}</span>
                                            )}
                                            <span>{item.label}</span>
                                        </span>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
};

/**
 * Nested dropdown menu component that supports multiple levels
 * Submenus are displayed on click and support unlimited nesting levels
 */
export const NestedDropdownMenu: React.FC<NestedDropdownMenuProps> = ({
    trigger,
    items,
    align = "end",
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                className="w-56 p-1 max-h-96 overflow-y-auto"
            >
                <NestedMenuItems items={items} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NestedDropdownMenu;
