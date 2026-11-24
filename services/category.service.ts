// services/category.service.ts

import axiosInstance from '@/lib/axios';
import { Category, PaginatedResponse } from '@/types/category';

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  image: File;
}

export interface UpdateCategoryPayload {
  name: string;
  slug: string;
  image?: File | null;
}

export const categoryService = {
  // 1. Get All (Paginated)
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<Category>> => {
    const response = await axiosInstance.get(`/admin/categories?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  // 2. Get Single (Edit page ke liye)
  getById: async (id: number): Promise<{ data: Category }> => {
    const response = await axiosInstance.get(`/admin/categories/${id}`);
    return response.data;
  },

  // 3. Create
  create: async (data: CreateCategoryPayload) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('image', data.image);

    const response = await axiosInstance.post('/admin/categories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 4. Update (POST with _method=PUT for file upload)
  update: async (id: number, data: UpdateCategoryPayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT'); // Laravel Method Spoofing
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axiosInstance.post(`/admin/categories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 5. Delete
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/categories/${id}`);
    return response.data;
  },
};

