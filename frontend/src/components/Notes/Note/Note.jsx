import toast from "react-hot-toast";

import { Trash2, Pencil } from "lucide-react";

// * APIs and API Handler
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../api/services/notes";

export default function Note({ note, handler }) {
  const queryClient = useQueryClient();

  const deleteNoteAPI = useMutation({
    mutationFn: (noteId) => deleteNote(noteId),
    onSuccess: () => handleDeleteSuccess(),
    onError: (error) => handleDeleteError(error),
  });
  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries(["notes"]);
    toast.success("Note deleted successfully.");
  };
  const handleDeleteError = (error) => {
    console.log("ERROR : ", error);
    toast.error("Something went wrong, please try again.");
  };
  const handleDeleteNote = (noteId) => deleteNoteAPI.mutate(noteId);

  return (
    <div
      className="group relative overflow-hidden break-inside-avoid mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 cursor-pointer"
      style={{ WebkitColumnBreakInside: "avoid" }}
    >
      <div className="p-4 pb-12" onClick={() => handler(note)}>
        {note.title && (
          <h3 className="font-medium text-gray-800 mb-2">{note.title}</h3>
        )}

        <p className="text-gray-600 whitespace-pre-line">{note.content}</p>
      </div>

      <div className="absolute w-full left-0 bottom-0 justify-between px-2 py-1 hidden group-hover:flex">
        <div className="flex items-center">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => handleDeleteNote(note._id)}
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => handler(note)}
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center">
          <span className="whitespace-nowrap rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs text-primary">
            {note.category}
          </span>
        </div>
      </div>
    </div>
  );
}
