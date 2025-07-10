import axiosInstance from "../config/axiosConfig";
import { API_USER } from "../constants/apiConstants";

export const googleLogin = async (idToken: string) => {
  const response = await axiosInstance.post(API_USER.GOOGLE_LOGIN, idToken, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get(API_USER.LOGOUT);
  return response.data;
};