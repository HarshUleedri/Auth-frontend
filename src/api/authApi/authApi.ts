import { axiosInstance } from "../apiConfig";

export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.log("error at login ", error);
    throw error;
  }
};

export const signupApi = async (data: {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.log("error at signup ", error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("error at logout ", error);
    throw error;
  }
};

export const getUserApi = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("error at get user ", error);
    throw error;
  }
};
