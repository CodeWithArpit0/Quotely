import axiosInstance from "../../axios";
import { LOGIN, LOGOUT, REGISTER } from "../../urls";

export const register = async (payload) => {
  const res = await axiosInstance.post(REGISTER, payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await axiosInstance.post(LOGIN, payload, {
    withCredentials: true,
  });
  return res.data;
};
export const logout = async (payload) => {
  const res = await axiosInstance.post(LOGOUT, payload, {
    withCredentials: true,
  });
  return res.data;
};
