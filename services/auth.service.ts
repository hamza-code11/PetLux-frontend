import axiosInstance from '@/lib/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  },

  register: async (data: RegisterPayload) => {
    const response = await axiosInstance.post('/register', data);
    return response.data;
  },

  getUser: async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post('/logout');
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordPayload) => {
    const response = await axiosInstance.post('/forgot-password', data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpPayload) => {
    const response = await axiosInstance.post('/verify-otp', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordPayload) => {
    const response = await axiosInstance.post('/reset-password', data);
    return response.data;
  },


  updateProfile: async (data: any) => {
    const response = await axiosInstance.put('/user', data);
    return response.data;
  },

  updatePassword: async (data: any) => {
    const response = await axiosInstance.put('/change-password', data);
    return response.data;
  },
};

