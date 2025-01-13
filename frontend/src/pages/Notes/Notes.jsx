import React, { useState, useReducer, useMemo } from "react";

// * Components
import Header from "../../components/Layout/Header/Header";
import TakeNote from "../../components/Notes/TakeNote/TakeNote";
import Note from "../../components/Notes/Note/Note";
import NoteModel from "../../components/Notes/NoteModel/NoteModel";

// * APIs and API Handler
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../api/services/notes";

// * Helpers
import useDebounce from "../../utils/useDebounce";

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const getFilteredNotes = (notes, value) => {
    if (!value) return notes;

    return notes.filter((obj) =>
      ["title", "content", "category"].some(
        (key) =>
          obj[key] &&
          String(obj[key]).toLowerCase().includes(String(value).toLowerCase())
      )
    );
  };
  const filteredNotes = useMemo(
    () => getFilteredNotes(notes, debouncedSearch),
    [notes, debouncedSearch]
  );
  console.log("filteredNotes : ", filteredNotes);

  useQuery({
    queryKey: ["notes"],
    queryFn: () =>
      getNotes().then(handleGetNotesSuccess).catch(handleGetNotesError),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const handleGetNotesSuccess = (data) => {
    setNotes(data.data);
  };
  const handleGetNotesError = (error) => {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong, please try again.");
    }
  };

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
      <Header search={search} setSearch={setSearch} />

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 space-y-12 md:px-8">
          <div className="flex items-center justify-center">
            <TakeNote />
          </div>

          <div className="sm:p-4 relative">
            <div className="w-full max-w-[1200px] mx-auto sm:columns-2 md:columns-3 lg:columns-4">
              {filteredNotes &&
              Array.isArray(filteredNotes) &&
              filteredNotes.length
                ? filteredNotes.map((note) => (
                    <Note
                      key={note._id}
                      note={note}
                      handler={handleNoteClick}
                    />
                  ))
                : null}
            </div>

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
