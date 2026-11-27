// services/subcategory.service.ts

import axiosInstance from '@/lib/axios';
import { Subcategory, PaginatedResponse } from '@/types/subcategory';

export interface CreateSubcategoryPayload {
  name: string;
  slug: string;
  image?: File;
}

export interface UpdateSubcategoryPayload {
  name: string;
  slug: string;
  image?: File | null;
}

export const subcategoryService = {
  // 1. Get All (Paginated)
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<Subcategory>> => {
    const response = await axiosInstance.get(`/admin/subcategories?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  // 2. Get Single (Edit page ke liye)
  getById: async (id: number): Promise<{ data: Subcategory }> => {
    const response = await axiosInstance.get(`/admin/subcategories/${id}`);
    return response.data;
  },

  // 3. Create
  create: async (data: CreateSubcategoryPayload) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    if (data.image) {
  formData.append("image", data.image);
}

    const response = await axiosInstance.post('/admin/subcategories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 4. Update (POST with _method=PUT for file upload)
  update: async (id: number, data: UpdateSubcategoryPayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT'); // Laravel Method Spoofing
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axiosInstance.post(`/admin/subcategories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 5. Delete
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/subcategories/${id}`);
    return response.data;
  },
};

