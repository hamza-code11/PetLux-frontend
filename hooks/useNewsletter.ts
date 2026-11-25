import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newsletterService } from "@/services/newsletter.service";
import { SubscribePayload } from "@/types/newsletter";

/* ---------------- PUBLIC ---------------- */

export const useSubscribeNewsletter = () =>
  useMutation({
    mutationFn: (data: SubscribePayload) => newsletterService.subscribe(data),
  });

/* ---------------- ADMIN ---------------- */

export const useGetNewsletterSubscribers = (params?: {
  page?: number;
  per_page?: number;
}) =>
  useQuery({
    queryKey: ["newsletters", params],
    queryFn: () => newsletterService.getAll(params),
    staleTime: 60 * 1000,
  });

export const useDeleteNewsletterSubscriber = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => newsletterService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["newsletters"] });
    },
  });
};

