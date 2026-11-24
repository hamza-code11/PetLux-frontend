// hooks/useProducts.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService, CreateProductPayload } from '@/services/product.service';

// --- Queries ---

export const useGetProducts = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['products', page, perPage],
    queryFn: () => productService.getAll(page, perPage),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

// --- Mutations ---

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductPayload) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateProductPayload }) => 
      productService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

