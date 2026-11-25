import axiosInstance from "@/lib/axios";
import {
  NewsletterSubscriber,
  SubscribePayload,
  PaginatedNewsletters,
} from "@/types/newsletter";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const mapSubscriber = (s: any): NewsletterSubscriber => ({
  ...s,
  date: formatDate(s.created_at),
});

export const newsletterService = {
  /** PUBLIC — POST /newsletter/subscribe */
  subscribe: async (data: SubscribePayload) => {
    const { data: res } = await axiosInstance.post("/newsletter/subscribe", data);
    return res as { message: string; data: NewsletterSubscriber };
  },

  /** ADMIN — GET /admin/newsletters */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedNewsletters> => {
    const { data } = await axiosInstance.get("/admin/newsletters", { params });
    return {
      ...data,
      data: (data.data ?? []).map(mapSubscriber),
    };
  },

  /** ADMIN — DELETE /admin/newsletters/{id} */
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/newsletters/${id}`);
    return data;
  },
};


