import axiosInstance from "../../axios";
import { NOTES } from "../../urls";

export const getNotes = async () => {
  const res = await axiosInstance.get(NOTES, {
    withCredentials: true,
  });
  return res.data;
};
export const createNote = async (payload) => {
  const res = await axiosInstance.post(NOTES, payload, {
    withCredentials: true,
  });
  return res.data;
};
export const updateNote = async (payload) => {
  const noteId = payload.noteId;
  delete payload.noteId;

  const res = await axiosInstance.put(`${NOTES}/${noteId}`, payload, {
    withCredentials: true,
  });
  return res.data;
};
export const deleteNote = async (noteId) => {
  const res = await axiosInstance.delete(`${NOTES}/${noteId}`, {
    withCredentials: true,
  });
  return res.data;
};
