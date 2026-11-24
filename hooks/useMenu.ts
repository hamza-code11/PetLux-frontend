import { useQuery } from '@tanstack/react-query';
import { menuService } from '@/services/menu.service';

export const useMenu = () => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: menuService.getMenu,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
};

