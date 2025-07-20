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
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object" &&
          (error as any).response !== null &&
          "data" in (error as any).response &&
          typeof (error as any).response.data === "object" &&
          (error as any).response.data !== null &&
          "message" in (error as any).response.data
        ) {
          setError((error as any).response.data.message as string);
        }
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
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object" &&
          (error as any).response !== null &&
          "data" in (error as any).response &&
          typeof (error as any).response.data === "object" &&
          (error as any).response.data !== null &&
          "message" in (error as any).response.data
        ) {
          setError((error as any).response.data.message as string);
        }
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
