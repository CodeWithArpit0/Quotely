import React, { useState, useRef, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import {
  Bell,
  Users,
  Palette,
  Image,
  Archive,
  MoreVertical,
  Undo,
  Redo,
  Lightbulb,
} from "lucide-react";

import Loader from "../../UI/Loader/Loader";
import SelectInputField from "../../UI/InputFields/SelectInputField/SelectInputField";
import { CATEGORIES } from "../../../constants";

// * APIs and API Handler
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../../api/services/notes";

const TakeNote = () => {
  const queryClient = useQueryClient();
  const noteRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const initialErrorState = {
    error: false,
    type: "",
    message: "",
  };
  const [error, setError] = useState(initialErrorState);

  const initialNoteState = {
    title: "",
    content: "",
    category: "",
  };
  const noteReducer = (state, action) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_CONTENT":
        return { ...state, content: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "RESET":
        return initialNoteState;
      default:
        return state;
    }
  };
  const actionsByName = {
    title: "SET_TITLE",
    content: "SET_CONTENT",
    category: "SET_CATEGORY",
  };
  const [note, dispatchNote] = useReducer(noteReducer, initialNoteState);
  const { title, content, category } = note;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        if (
          title.trim() === "" &&
          content.trim() === "" &&
          category.trim() === ""
        ) {
          resetAndClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content, category]);

  const createNoteAPI = useMutation({
    mutationFn: (payload) => createNote(payload),
    onSuccess: (data) => handleCreateNoteSuccess(data),
    onError: (data) => handleCreateNoteError(data),
  });
  const handleCreateNoteSuccess = () => {
    toast.success("Note created successfully.");
    queryClient.invalidateQueries(["notes"]);
    dispatchNote({ type: "RESET" });
    resetAndClose();
  };
  const handleCreateNoteError = (error) => {
    console.log("ERROR : ", error);
    toast.error("Something went wrong, please try again.");
  };
  const addNote = (payload) => createNoteAPI.mutate(payload);
  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;
    for (const fieldName in note) {
      hasError = validateFields(fieldName, note[fieldName]);
      if (hasError) {
        setError(() => ({
          error: true,
          type: fieldName,
          message: hasError,
        }));

        break;
      }
    }

    if (!hasError) addNote(note);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatchNote({
      type: actionsByName[name],
      payload: value,
    });

    const hasError = validateFields(name, value);
    if (hasError) {
      setError(() => ({
        error: true,
        type: name,
        message: hasError,
      }));
    } else if (!hasError && error.error) {
      setError(initialErrorState);
    }
  };
  const validateFields = (name, value) => {
    let hasError = "";

    switch (name) {
      case "title":
        if (!value || value.trim() === "") hasError = "Title cannot be empty";
        break;
      case "content":
        if (!value || value.trim() === "")
          hasError = "Note content cannot be empty";
        break;
      case "category":
        if (!value || value.trim() === "") hasError = "Category is required.";
        break;
    }
    return hasError;
  };
  const handleFocus = () => setIsExpanded(true);
  const resetAndClose = () => {
    setIsExpanded(false);
    dispatchNote({ type: "RESET" });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4" ref={noteRef}>
      <div
        className={`
        bg-white rounded-lg shadow-md transition-all duration-200
        ${isExpanded ? "shadow-lg" : "shadow"}
      `}
      >
        {isExpanded ? (
          <div className="p-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleChange}
              className={`w-full px-2 py-1 mb-2 text-lg font-medium text-gray-700 placeholder-gray-500 bg-transparent outline-none rounded-md ${
                error.error && error.type === "title" ? "bg-red-100" : ""
              }`}
            />

            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleChange}
              placeholder="Take a note..."
              className={`w-full px-2 py-1 min-h-[100px] text-gray-700 placeholder-gray-500 bg-transparent outline-none resize-none rounded-md ${
                error.error && error.type === "content" ? "bg-red-100" : ""
              }`}
              autoFocus
            />

            <SelectInputField
              id="category"
              name="category"
              placeholder="Select Category"
              value={category}
              options={CATEGORIES}
              handler={handleChange}
              error={error}
              errorType="category"
            />

            <div className="flex flex-col gap-y-3 sm:gap-0 grow sm:flex-row items-center sm:justify-between mt-2">
              <div className="w-full flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Users size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Palette size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Image size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Archive size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Undo size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Redo size={18} />
                </button>
              </div>

              <div className="w-full flex justify-end space-x-2">
                <button
                  onClick={resetAndClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={createNoteAPI.isPending}
                  className="px-4 py-2 text-sm text-white bg-primary hover:bg-primaryDark rounded transition-colors"
                >
                  {createNoteAPI.isPending ? (
                    <Loader theme="light" size="small" />
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 flex items-center">
            <Lightbulb className="text-primary" />
            <input
              type="text"
              placeholder="Take a note..."
              onFocus={handleFocus}
              className="w-full px-2 py-1 text-gray-700 placeholder-gray-500 bg-transparent outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeNote;
