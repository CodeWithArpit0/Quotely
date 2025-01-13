import axiosInstance from "../../axios";
import { LOGIN, LOGOUT, UPDATE_PASSWORD, GET_USER, REGISTER } from "../../urls";

export const register = async (payload) => {
  const res = await axiosInstance.post(REGISTER, payload);
  return res.data;
};
export const getUser = async (payload) => {
  const res = await axiosInstance.post(GET_USER, payload);
  return res.data;
};
export const login = async (payload) => {
  const res = await axiosInstance.post(LOGIN, payload, {
    withCredentials: true,
  });
  return res.data;
};
export const updatePassword = async (payload) => {
  const res = await axiosInstance.put(UPDATE_PASSWORD, payload);
  return res.data;
};
export const logout = async (payload) => {
  const res = await axiosInstance.post(LOGOUT, payload, {
    withCredentials: true,
  });
  return res.data;
};
