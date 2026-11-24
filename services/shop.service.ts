import axiosInstance from '@/lib/axios';
import { PaginatedResponse } from '@/types/category'; // Reuse karein ya naya banayein
import { ShopProduct, ShopFiltersData, ReviewsResponse } from '@/types/shop';

export interface ShopFilterParams {
  page?: number;
  per_page?: number;
  pet_type_id?: string;
  category_id?: string;
  subcategory_id?: string;
  min_price?: string;
  max_price?: string;
  search?: string;
}

export const shopService = {
  getProducts: async (params: ShopFilterParams): Promise<PaginatedResponse<ShopProduct>> => {
    const queryString = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryString.append(key, String(value));
      }
    });

    const response = await axiosInstance.get(`/shop/products?${queryString.toString()}`);
    return response.data;
  },



  // Add to shopService object:
  getFilters: async (params: { pet_type_slug?: string; category_slug?: string }): Promise<ShopFiltersData> => {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryString.append(key, value);
    });
    const response = await axiosInstance.get(`/shop/filters?${queryString.toString()}`);
    return response.data;
  },





  getProductBySlug: async (slug: string): Promise<{ data: ShopProduct }> => {
  const response = await axiosInstance.get(`/shop/products/${slug}`);
  return response.data;
},





// shopService object me add karein:
getReviews: async (slug: string): Promise<ReviewsResponse> => {
  const response = await axiosInstance.get(`/products/${slug}/reviews`);
  return response.data;
},

submitReview: async (slug: string, data: { rating: number; comment: string }) => {
  const response = await axiosInstance.post(`/products/${slug}/reviews`, data);
  return response.data;
},




};







