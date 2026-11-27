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
      return res.data as { data: Order };   // 👈 yahan type
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



// hooks/useOrders.ts

export function useMyOrders() {
  return useQuery<{ status: boolean; data: Order[] }>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/my-orders`);
      return data;
    },
    staleTime: 30_000,
  });
}


export function useTrackOrder(orderNumber: string) {
  return useQuery<{ status: boolean; data: Order }>({
    queryKey: ["track-order", orderNumber],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/orders/track/${encodeURIComponent(orderNumber)}`
      );
      return data;
    },
    enabled: !!orderNumber,
    retry: false,
  });
}
