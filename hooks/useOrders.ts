"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Order } from "@/types/order";
import axiosInstance from '@/lib/axios';

// ---------- QUERIES ----------
export const useGetOrders = (params?: { per_page?: number }) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/orders', { params });
      return res.data;
    },
  });
};

export const useGetOrder = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/admin/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// ---------- MUTATIONS ----------
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: number; status: Order["status"] }) => {
      const res = await axiosInstance.put(`/admin/orders/${payload.id}/status`, { status: payload.status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosInstance.delete(`/admin/orders/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// ---------- PLACE ORDER (USER SIDE) ----------
export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post('/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
  });
};
