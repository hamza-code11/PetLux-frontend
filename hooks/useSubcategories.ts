// hooks/useSubcategories.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  subcategoryService, 
  CreateSubcategoryPayload, 
  UpdateSubcategoryPayload 
} from '@/services/subcategory.service';

// --- Queries (Data Fetching) ---

// 1. Get All Subcategories (List ke liye)
export const useGetSubcategories = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['subcategories', page, perPage],
    queryFn: () => subcategoryService.getAll(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// 2. Get Single Subcategory (Edit form ke liye)
export const useGetSubcategory = (id: number) => {
  return useQuery({
    queryKey: ['subcategory', id],
    queryFn: () => subcategoryService.getById(id),
    enabled: !!id, // Jab id valid ho tabhi call kare
  });
};

// --- Mutations (Actions) ---

// 3. Create Subcategory
export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSubcategoryPayload) => subcategoryService.create(data),
    onSuccess: () => {
      // List ko refresh karein
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
    },
  });
};

// 4. Update Subcategory
export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSubcategoryPayload }) => 
      subcategoryService.update(id, data),
    onSuccess: (_, variables) => {
      // List aur Single item dono ko refresh karein
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      queryClient.invalidateQueries({ queryKey: ['subcategory', variables.id] });
    },
  });
};

// 5. Delete Subcategory
export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => subcategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
    },
  });
};

