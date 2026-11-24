// services/product.service.ts

import axiosInstance from '@/lib/axios';
import { Product, PaginatedResponse } from '@/types/product';

export interface CreateProductPayload {
  name: string;
  slug: string;
  status: "draft" | "publish";
  pet_type_id?: number | null;
  category_id?: number | null;
  subcategory_id?: number | null;
  short_description?: string;
  long_description?: string;
  has_variants: boolean;
  
  // Simple Product
  regular_price?: string;
  sale_price?: string;
  quantity?: string;
  main_images?: File[];
  
  // Variant Product
  variants?: any[];
  
  // Update specific (for handling deleted images)
  deleted_image_ids?: number[];
}

export const productService = {
  // 1. Get All (Paginated)
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<Product>> => {
    const response = await axiosInstance.get(`/admin/products?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  // 2. Get Single
  getById: async (id: number): Promise<{ data: Product }> => {
    const response = await axiosInstance.get(`/admin/products/${id}`);
    return response.data;
  },

  // 3. Create
  create: async (data: CreateProductPayload) => {
    const formData = new FormData();
    
    // Basic Fields
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('status', data.status);
    
    // Convert boolean to '1' or '0' for Laravel validation
    formData.append('has_variants', data.has_variants ? '1' : '0');
    
    if (data.pet_type_id) formData.append('pet_type_id', String(data.pet_type_id));
    if (data.category_id) formData.append('category_id', String(data.category_id));
    if (data.subcategory_id) formData.append('subcategory_id', String(data.subcategory_id));
    if (data.short_description) formData.append('short_description', data.short_description);
    if (data.long_description) formData.append('long_description', data.long_description);

    // Simple Product Data
    if (!data.has_variants) {
      if (data.regular_price) formData.append('regular_price', data.regular_price);
      if (data.sale_price) formData.append('sale_price', data.sale_price);
      if (data.quantity) formData.append('quantity', data.quantity);
      
      // Images
      data.main_images?.forEach((file) => {
        formData.append('main_images[]', file);
      });
    } 
    // Variant Product Data
    else {
      if (data.variants) {
        // FIX: Send as array format instead of JSON string
        data.variants.forEach((v: any, index: number) => {
          formData.append(`variants[${index}][name]`, v.name || '');
          formData.append(`variants[${index}][slug]`, v.slug || '');
          formData.append(`variants[${index}][regular_price]`, v.regular_price || '');
          formData.append(`variants[${index}][sale_price]`, v.sale_price || '');
          formData.append(`variants[${index}][quantity]`, v.quantity || '0');
          formData.append(`variants[${index}][description]`, v.description || '');
          
          // Variant Images
          v.images?.forEach((file: File) => {
            formData.append(`variants[${index}][images][]`, file);
          });
        });
      }
    }

    const response = await axiosInstance.post('/admin/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 4. Update
  update: async (id: number, data: CreateProductPayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('status', data.status);
    
    // Convert boolean to '1' or '0'
    formData.append('has_variants', data.has_variants ? '1' : '0');
    
    if (data.pet_type_id) formData.append('pet_type_id', String(data.pet_type_id));
    if (data.category_id) formData.append('category_id', String(data.category_id));
    if (data.subcategory_id) formData.append('subcategory_id', String(data.subcategory_id));
    if (data.short_description) formData.append('short_description', data.short_description);
    if (data.long_description) formData.append('long_description', data.long_description);

    // Handle deleted images (if any)
    if (data.deleted_image_ids && data.deleted_image_ids.length > 0) {
      data.deleted_image_ids.forEach((imgId) => {
        formData.append('deleted_image_ids[]', String(imgId));
      });
    }

    if (!data.has_variants) {
      if (data.regular_price) formData.append('regular_price', data.regular_price);
      if (data.sale_price) formData.append('sale_price', data.sale_price);
      if (data.quantity) formData.append('quantity', data.quantity);
      
      data.main_images?.forEach((file) => {
        formData.append('main_images[]', file);
      });
    } else {
      if (data.variants) {
        // FIX: Send as array format instead of JSON string
        data.variants.forEach((v: any, index: number) => {
          // Preserve ID for existing variants (if provided)
          if (v.id && !isNaN(Number(v.id))) {
            formData.append(`variants[${index}][id]`, String(v.id));
          }
          formData.append(`variants[${index}][name]`, v.name || '');
          formData.append(`variants[${index}][slug]`, v.slug || '');
          formData.append(`variants[${index}][regular_price]`, v.regular_price || '');
          formData.append(`variants[${index}][sale_price]`, v.sale_price || '');
          formData.append(`variants[${index}][quantity]`, v.quantity || '0');
          formData.append(`variants[${index}][description]`, v.description || '');
          
          // Variant Images
          v.images?.forEach((file: File) => {
            formData.append(`variants[${index}][images][]`, file);
          });
        });
      }
    }

    const response = await axiosInstance.post(`/admin/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 5. Delete
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/products/${id}`);
    return response.data;
  },
};
