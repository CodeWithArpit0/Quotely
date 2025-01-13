import axiosInstance from "../../axios";
import { UPDATE_PASSWORD } from "../../urls";

export const changePassword = async (payload) => {
  const res = await axiosInstance.put(UPDATE_PASSWORD, payload, {
    withCredentials: true,
  });
  return res.data;
};
