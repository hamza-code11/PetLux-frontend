// services/pet-type.service.ts

import axiosInstance from '@/lib/axios'; // Aapka axios instance
import { PetType, PaginatedResponse, PublicPetType  } from '@/types/petType';

export interface CreatePetTypePayload {
  name: string;
  slug: string;
  image: File;
}

export interface UpdatePetTypePayload {
  name: string;
  slug: string;
  image?: File | null; // Optional, agar user image change karna chahe
}

export const petTypeService = {
  // 1. Get All (Paginated)
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<PetType>> => {
    const response = await axiosInstance.get(`/admin/pet-types?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  // 2. Get Single (Edit page ke liye)
  getById: async (id: number): Promise<{ data: PetType }> => {
    const response = await axiosInstance.get(`/admin/pet-types/${id}`);
    return response.data;
  },

  // 3. Create
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

  // 4. Update (POST with _method=PUT for file upload)
  update: async (id: number, data: UpdatePetTypePayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT'); // Laravel Method Spoofing
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

  // 5. Delete
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/pet-types/${id}`);
    return response.data;
  },


  // services/pet-type.service.ts me add karein

  toggleNavbar: async (id: number) => {
    const response = await axiosInstance.patch(`/admin/pet-types/${id}/toggle-navbar`);
    return response.data;
  },


  

    // 6. Public homepage pet types (all)
  getPublic: async (): Promise<{ data: PublicPetType[] }> => {
    const response = await axiosInstance.get('/pet-types');
    return response.data;
  },

  
};
