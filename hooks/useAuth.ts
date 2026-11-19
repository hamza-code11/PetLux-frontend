import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginPayload, RegisterPayload, ForgotPasswordPayload, VerifyOtpPayload, ResetPasswordPayload } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));
      // Yahan se router.push aur refresh hata dein (Form handle karega)
      // router.push('/'); 
      // router.refresh();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) => authService.forgotPassword(data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => authService.verifyOtp(data),
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => authService.resetPassword(data),
    onSuccess: () => {
      router.push('/login');
    },
  });
};

// --- Queries (Data Fetching) ---

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        // 1. Background me API call karein latest data ke liye
        const data = await authService.getUser();
        // API se data aane par LocalStorage update karein
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(data.user));
        }
        return data;
      } catch (error) {
        // Agar API fail ho (jaise token expire), toh LocalStorage se data uthayein
        if (typeof window !== 'undefined') {
          const localUser = localStorage.getItem('user_data');
          if (localUser) {
            return { user: JSON.parse(localUser) };
          }
        }
        throw error;
      }
    },
    // 2. Initial Data LocalStorage se uthayein (No Delay!)
    initialData: () => {
      if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem('user_data');
        if (localUser) {
          return { user: JSON.parse(localUser) };
        }
      }
      return undefined;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
};











// hooks/useAuth.ts (existing code ke sath add karein)

// 1. Logout Hook
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); // import { useQueryClient } from '@tanstack/react-query';

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      queryClient.clear(); // Cache clear karein
      router.push('/login');
      router.refresh();
    },
    onError: () => {
      // Agar backend fail bhi ho jaye, frontend se toh logout kar hi dein
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      queryClient.clear();
      router.push('/login');
      router.refresh();
    }
  });
};

// 2. Update Profile Hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { first_name: string; last_name: string; email: string; phone: string }) => 
      authService.updateProfile(data), // Service file me updateProfile add karna hoga
    onSuccess: (data) => {
      localStorage.setItem('user_data', JSON.stringify(data.user)); // LocalStorage update karein
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); // Navbar aur Profile refresh ho jayega
    },
  });
};

// 3. Update Password Hook
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: any) => authService.updatePassword(data), // Service file me updatePassword add karna hoga
  });
};


