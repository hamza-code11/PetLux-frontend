// hooks/usePetTypes.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  petTypeService, 
  CreatePetTypePayload, 
  UpdatePetTypePayload 
} from '@/services/pet-type.service';

// --- Queries (Data Fetching) ---

// 1. Get All Pet Types (List ke liye)
export const useGetPetTypes = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['petTypes', page, perPage],
    queryFn: () => petTypeService.getAll(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes (Backend me bhi cache hai)
  });
};

// 2. Get Single Pet Type (Edit form ke liye)
export const useGetPetType = (id: number) => {
  return useQuery({
    queryKey: ['petType', id],
    queryFn: () => petTypeService.getById(id),
    enabled: !!id, // Jab id valid ho tabhi call kare
  });
};

// --- Mutations (Actions) ---

// 3. Create Pet Type
export const useCreatePetType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePetTypePayload) => petTypeService.create(data),
    onSuccess: () => {
      // List ko refresh karein taaki naya item show ho
      queryClient.invalidateQueries({ queryKey: ['petTypes'] });
    },
  });
};

// 4. Update Pet Type
export const useUpdatePetType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePetTypePayload }) => 
      petTypeService.update(id, data),
    onSuccess: (_, variables) => {
      // List aur Single item dono ko refresh karein
      queryClient.invalidateQueries({ queryKey: ['petTypes'] });
      queryClient.invalidateQueries({ queryKey: ['petType', variables.id] });
    },
  });
};

// 5. Delete Pet Type
export const useDeletePetType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => petTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['petTypes'] });
    },
  });
};









export const useTogglePetTypeNavbar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => petTypeService.toggleNavbar(id),
    
    // Optimistic Update
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['petTypes'] });
      const previousData = queryClient.getQueriesData({ queryKey: ['petTypes'] });
      
      queryClient.setQueriesData({ queryKey: ['petTypes'] }, (oldData: any) => {
        if (!oldData || !oldData.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((item: any) => 
            item.id === id 
              ? { ...item, show_in_navbar: item.show_in_navbar ? 0 : 1 }
              : item
          )
        };
      });
      
      return { previousData };
    },
    
    onError: (err, id, context: any) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]: any) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    
    // Success ya error ke baad, menu ko bhi refresh karein
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['petTypes'] });
      queryClient.invalidateQueries({ queryKey: ['menu'] }); // <-- YEH ZAROORI HAI
    },
  });
};



