import React, { useState, useReducer } from "react";

// * Components
import Header from "../../components/Layout/Header/Header";
import TakeNote from "../../components/Notes/TakeNote/TakeNote";
import Note from "../../components/Notes/Note/Note";
import NoteModel from "../../components/Notes/NoteModel/NoteModel";

// * APIs and API Handler
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../api/services/notes";

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getNotesAPI = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const notes = getNotesAPI.isPending ? [] : getNotesAPI?.data?.data || [];

  const initialNoteState = {
    title: "",
    content: "",
    selectedNote: null,
  };
  const updateNoteReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE_NOTE":
        return action.payload;
      case "UPDATE_NOTE":
        return { ...state, ...action.payload };
      case "RESET":
        return initialNoteState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(updateNoteReducer, initialNoteState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "UPDATE_NOTE",
      payload: { [name]: value },
    });
  };
  const handleNoteClick = (note) => {
    dispatch({
      type: "INITIALIZE_NOTE",
      payload: {
        title: note.title,
        content: note.content,
        selectedNote: note,
      },
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch({
      type: "RESET",
    });
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 space-y-12 md:px-8">
          <div className="flex items-center justify-center">
            <TakeNote />
          </div>

          <div className="p-4 relative">
            {/* Masonry Grid */}
            <div
              style={{
                columnCount: 4,
                columnGap: "1rem",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
              className="w-full sm:columns-2 md:columns-3 lg:columns-4"
            >
              {notes.map((note) => (
                <Note key={note._id} note={note} handler={handleNoteClick} />
              ))}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && state.selectedNote && (
              <NoteModel
                note={state}
                onChange={handleChange}
                onBlur={handleClickOutside}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
