import axiosInstance from "@/lib/axios";
import {
  ContactMessagePayload,
  ContactMessage,
  PaginatedContacts,
} from "@/types/contact";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const mapMessage = (m: any): ContactMessage => ({
  ...m,
  date: formatDate(m.created_at),
});

export const contactService = {
  /** PUBLIC — POST /contact */
  send: async (data: ContactMessagePayload) => {
    const { data: res } = await axiosInstance.post("/contact", data);
    return res as { message: string; data: ContactMessage };
  },

  /** ADMIN — GET /admin/contact-messages */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    status?: "read" | "unread";
  }): Promise<PaginatedContacts> => {
    const { data } = await axiosInstance.get("/admin/contact-messages", { params });
    return {
      ...data,
      data: (data.data ?? []).map(mapMessage),
    };
  },

  /** ADMIN — GET /admin/contact-messages/{id} (auto-marks as read) */
  getById: async (id: number): Promise<{ data: ContactMessage }> => {
    const { data } = await axiosInstance.get(`/admin/contact-messages/${id}`);
    return { data: mapMessage(data.data) };
  },

  /** ADMIN — PATCH /admin/contact-messages/{id}/status */
  updateStatus: async (id: number, status: "read" | "unread") => {
    const { data } = await axiosInstance.patch(
      `/admin/contact-messages/${id}/status`,
      { status }
    );
    return data;
  },

  /** ADMIN — DELETE /admin/contact-messages/{id} */
  delete: async (id: number) => {
    const { data } = await axiosInstance.delete(`/admin/contact-messages/${id}`);
    return data;
  },
};
