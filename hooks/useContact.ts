import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";
import { ContactMessagePayload } from "@/types/contact";

/* ---------------- PUBLIC ---------------- */
export const useSendContactMessage = () =>
  useMutation({
    mutationFn: (data: ContactMessagePayload) => contactService.send(data),
  });

/* ---------------- ADMIN ---------------- */

export const useGetContactMessages = (params?: {
  page?: number;
  per_page?: number;
  status?: "read" | "unread";
}) =>
  useQuery({
    queryKey: ["contactMessages", params],
    queryFn: () => contactService.getAll(params),
    staleTime: 60 * 1000,
  });

export const useGetContactMessage = (id: number) =>
  useQuery({
    queryKey: ["contactMessage", id],
    queryFn: () => contactService.getById(id),
    enabled: !!id,
  });

export const useUpdateContactStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: "read" | "unread" }) =>
      contactService.updateStatus(id, status),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["contactMessages"] });
      qc.invalidateQueries({ queryKey: ["contactMessage", vars.id] });
    },
  });
};

export const useDeleteContactMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => contactService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contactMessages"] });
    },
  });
};

