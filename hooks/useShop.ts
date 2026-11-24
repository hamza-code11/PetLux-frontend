import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopService, ShopFilterParams } from '@/services/shop.service';



export const useGetShopProducts = (params: ShopFilterParams) => {
  return useQuery({
    queryKey: ['shopProducts', params],
    queryFn: () => shopService.getProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

// Filters ke liye data (Pet Types, Categories, Subcategories)
// Hum pehle banaye hue hooks use karenge (useGetPetTypes, useGetCategories, useGetSubcategories)




export const useGetShopFilters = (params: { pet_type_slug?: string; category_slug?: string }) => {
  return useQuery({
    queryKey: ['shopFilters', params],
    queryFn: () => shopService.getFilters(params),
    staleTime: 5 * 60 * 1000,
  });
};





export const useGetShopProduct = (slug: string) => {
  return useQuery({
    queryKey: ['shopProduct', slug],
    queryFn: () => shopService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};







export const useGetProductReviews = (slug: string) => {
  return useQuery({
    queryKey: ['productReviews', slug],
    queryFn: () => shopService.getReviews(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSubmitReview = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; comment: string }) => 
      shopService.submitReview(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productReviews', slug] });
    },
  });
};

