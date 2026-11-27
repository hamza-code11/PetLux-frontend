import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type DashboardStats = {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
};

type DashboardStatsResponse = {
  status: boolean;
  data: DashboardStats;
};

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["admin", "dashboard", "stats"],

    queryFn: async () => {
      const { data } =
        await axiosInstance.get<DashboardStatsResponse>(
          "/admin/dashboard/stats"
        );

      return data.data;
    },

    staleTime: 60 * 1000,
  });
}
