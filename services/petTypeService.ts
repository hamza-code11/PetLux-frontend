// services/petTypeService.ts

import axiosInstance from '@/lib/axios';
import { 
  PetType, 
  PaginatedResponse, 
  CreatePetTypePayload, 
  UpdatePetTypePayload 
} from '@/types/petType';

export const petTypeService = {
  // 1. GET: List all with Pagination
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<PetType>> => {
    const response = await axiosInstance.get(`/admin/pet-types?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  // 2. GET: Single Pet Type (Edit page ke liye)
  getById: async (id: number): Promise<{ data: PetType }> => {
    const response = await axiosInstance.get(`/admin/pet-types/${id}`);
    return response.data;
  },

  // 3. POST: Create new
  create: async (data: CreatePetTypePayload) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('image', data.image);

    const response = await axiosInstance.post('/admin/pet-types', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 4. PUT: Update existing
  update: async (id: number, data: UpdatePetTypePayload) => {
    const formData = new FormData();
    
    // Laravel PUT method spoofing (File upload ke liye zaroori)
    formData.append('_method', 'PUT'); 
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axiosInstance.post(`/admin/pet-types/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 5. DELETE
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/pet-types/${id}`);
    return response.data;
  },
};
