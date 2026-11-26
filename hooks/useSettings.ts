import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface ShippingSetting {
  shipping_charges: number;
}

export const useGetShippingCharges = () => {
  return useQuery({
    queryKey: ['shippingCharges'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/settings/shipping');
      return res.data;
    },
    staleTime: 0,
  });
};

export const useUpdateShippingCharges = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ShippingSetting) => {
      const res = await axiosInstance.post('/admin/settings/shipping', data);
      return res.data;
    },
    onSuccess: () => {
      // Update hone ke baad cache refresh
      queryClient.invalidateQueries({ queryKey: ['shippingCharges'] });
    },
  });
};






export interface PaymentSettings {
  bank_name: string;
  account_title: string;
  account_number: string;
  iban: string;
  instructions: string;
  qr_image_path: string | null;
}

// 1. Fetch Payment Settings
export const useGetPaymentSettings = () => {
  return useQuery({
    queryKey: ['paymentSettings'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/settings/payment');
      return res.data;
    },
    staleTime: 0,
    refetchOnMount: true, 
  });
};

// 2. Update Payment Settings (with Image)
export const useUpdatePaymentSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { formData: FormData }) => {
      const res = await axiosInstance.post('/admin/settings/payment', data.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // Update hone ke baad cache refresh
      queryClient.invalidateQueries({ queryKey: ['paymentSettings'] });
    },
  });
};