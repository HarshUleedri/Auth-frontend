import {
  getUserApi,
  loginApi,
  logoutApi,
  signupApi,
} from "@/api/authApi/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { login, setIsLoading, setError } = useAuthStore((state) => state);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApi(data),
    onSuccess: async () => {
      try {
        setIsLoading(true);
        const res = await getUserApi();
        if (res.success) {
          login(res.user);
          navigate("/");
        }
      } catch (error) {
        setError(error?.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
};
export const useSignup = () => {
  const { signup, setIsLoading, setError } = useAuthStore((state) => state);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
      profilePic: string;
    }) => signupApi(data),
    onSuccess: async () => {
      try {
        setIsLoading(true);
        const res = await getUserApi();
        if (res.success) {
          signup(res.user);
          navigate("/");
        }
      } catch (error) {
        setError(error?.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore((state) => state);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });
};
