import axios from "../config/axiosConfig";
import { API_USER } from "../constants/apiConstants";

export const importUsers = (formData: FormData) => {
  return axios.post(API_USER.IMPORT_USERS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUsers = (page = 1, pageSize = 10) => {
  return axios.get(API_USER.GET_USERS, {
    params: { page, pageSize },
  });
};

export const updateUser = (userId: string, data: any) => {
  return axios.put(`${API_USER.UPDATE_USER}/${userId}`, data);
};
