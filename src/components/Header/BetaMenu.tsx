import {
    NestedDropdownMenu,
    type NestedMenuItem,
} from "@/components/ui/nested-dropdown-menu";
import { getMenuItems } from "@/lib/services/menu-service";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

/**
 * Beta menu with nested structure
 */
const BetaMenu: React.FC = () => {

    const { data: menuItems, isLoading, error } = useQuery({
        queryKey: ['menuItems'], // Unique key
        queryFn: getMenuItems,     // Fetching function
    })

    const renderMenuContent = () => {

        if (isLoading) {
            return <div>Loading menu items...</div>
        }

        if (error) {
            return <div>Error loading menu items</div>
        }

        return (
            <NestedDropdownMenu
                trigger={
                    <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Beta
                        <ChevronDown className="w-4 h-4" />
                    </button>
                }
                items={menuItems}
                align="end"
            />)
    }

    return (
        <div>{renderMenuContent()}</div>
    );
}

export default BetaMenu;