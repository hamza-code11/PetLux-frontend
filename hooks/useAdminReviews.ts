"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios"; // adjust to your axios instance
import { Review, ReviewStats } from "@/types/review";

interface ReviewsResponse {
  data: Review[];
  total: number;
  stats: ReviewStats;
}

export function useAdminReviews(params?: {
  status?: string;
  rating?: string;
  search?: string;
}) {
  return useQuery<ReviewsResponse>({
    queryKey: ["admin-reviews", params],
    queryFn: async () => {
      const { data } = await axios.get("/admin/reviews", { params });
      return data;
    },
  });
}

export function useApproveReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.patch(`/admin/reviews/${id}/approve`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      qc.invalidateQueries({ queryKey: ["product-reviews"] });
    },
  });
}

export function useRejectReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.patch(`/admin/reviews/${id}/reject`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/admin/reviews/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
      qc.invalidateQueries({ queryKey: ["product-reviews"] });
    },
  });
}
