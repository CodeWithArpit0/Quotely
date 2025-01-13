// * Icons
import {
  Bell,
  Users,
  Palette,
  Image,
  Archive,
  MoreVertical,
  Undo,
  Redo,
} from "lucide-react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../../../api/services/notes";

export default function NoteModel({ note, onChange, onClose, onBlur }) {
  const queryClient = useQueryClient();

  const updateNoteAPI = useMutation({
    mutationFn: (payload) => updateNote(payload),
    onSuccess: () => handleUpdateNoteSuccess(),
    onError: () => handleUpdateNoteError(),
  });
  const handleUpdateNoteSuccess = () => {
    queryClient.invalidateQueries(["notes"]);
    onClose();
    toast.success("Note updated successfully.");
  };
  const handleUpdateNoteError = () => {
    console.log("ERROR : ", error);
    toast.error("Something went wrong, please try again.");
  };
  const handleUpdateNote = () => {
    const updatedNote = {
      noteId: note.selectedNote._id,
      title: note.title,
      content: note.content,
    };
    updateNoteAPI.mutate(updatedNote);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onBlur}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <input
            id="updateTitle"
            name="title"
            type="text"
            className="w-full text-lg font-medium border-none focus:outline-none focus:ring-0"
            placeholder="Title"
            value={note.title}
            onChange={onChange}
          />
        </div>

        <div className="p-4">
          <textarea
            id="updateContent"
            name="content"
            placeholder="Note"
            value={note.content}
            onChange={onChange}
            style={{ height: "auto" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full min-h-[200px] border-none focus:outline-none focus:ring-0 resize-none"
          />
        </div>

        <div className="p-4 flex flex-col gap-y-3 sm:gap-0 grow sm:flex-row items-center sm:justify-between mt-2">
          <div className="w-full flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Users className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Palette className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Archive className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Undo className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Redo className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="w-full flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Close
            </button>
            <button
              onClick={handleUpdateNote}
              className="px-4 py-2 text-sm text-white bg-primary hover:bg-primaryDark rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
