// hooks/usePetTypes.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { petTypeService } from '@/services/petTypeService';
import { CreatePetTypePayload, UpdatePetTypePayload } from '@/types/petType';

// --- Queries (Data Fetching) ---

// 1. List fetch karne ke liye hook
export const useGetPetTypes = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['petTypes', page, perPage], // Cache key (pagination ke hisab se)
    queryFn: () => petTypeService.getAll(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes tak fresh samjhega
  });
};

// 2. Single item fetch karne ke liye hook
export const useGetPetType = (id: number) => {
  return useQuery({
    queryKey: ['petType', id],
    queryFn: () => petTypeService.getById(id),
    enabled: !!id, // Agar ID 0 ya undefined ho toh call na kare
  });
};

// --- Mutations (Create, Update, Delete) ---

// 3. Create (Add) karne ke liye
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

// 4. Update karne ke liye
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

// 5. Delete karne ke liye
export const useDeletePetType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => petTypeService.delete(id),
    onSuccess: () => {
      // List ko refresh karein taaki deleted item hat jaye
      queryClient.invalidateQueries({ queryKey: ['petTypes'] }); 
    },
  });
};

