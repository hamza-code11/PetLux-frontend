import axiosInstance from '@/lib/axios';
import { MenuPetType } from '@/types/menu';

export const menuService = {
  getMenu: async (): Promise<MenuPetType[]> => {
    const response = await axiosInstance.get('/menu');
    return response.data;
  },
};

