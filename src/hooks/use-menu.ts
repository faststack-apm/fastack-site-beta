import { useQuery } from '@tanstack/react-query';
import { getMenuItems } from '@/lib/services/menu-service';
import { NestedMenuItem } from '@/components/NestedDropdownMenu/NestedDropdownMenu';

export const useMenu = () => {
    return useQuery<NestedMenuItem[], Error>({
        queryKey: ['navigation-menu'],
        queryFn: getMenuItems,
        // Optional: Keep the data fresh or prevent auto-refetching
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};