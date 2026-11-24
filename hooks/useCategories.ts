// hooks/useCategories.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  categoryService, 
  CreateCategoryPayload, 
  UpdateCategoryPayload 
} from '@/services/category.service';

// --- Queries (Data Fetching) ---

// 1. Get All Categories (List ke liye)
export const useGetCategories = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['categories', page, perPage],
    queryFn: () => categoryService.getAll(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// 2. Get Single Category (Edit form ke liye)
export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id, // Jab id valid ho tabhi call kare
  });
};

// --- Mutations (Actions) ---

// 3. Create Category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryPayload) => categoryService.create(data),
    onSuccess: () => {
      // List ko refresh karein
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// 4. Update Category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryPayload }) => 
      categoryService.update(id, data),
    onSuccess: (_, variables) => {
      // List aur Single item dono ko refresh karein
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
    },
  });
};

// 5. Delete Category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};



