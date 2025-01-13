const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  const { search, category, sortBy, startDate, endDate } = req.query;

  let query = { user: req.user.id };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  let sort = {};
  if (sortBy) {
    const [field, order] = sortBy.split(":");
    sort[field] = order === "desc" ? -1 : 1;
  } else {
    sort.createdAt = -1;
  }

  const notes = await Note.find(query).sort(sort);
  if (notes && notes.length) {
    res.status(200).json({ message: "Notes found", data: notes });
  } else {
    res.status(200).json({ message: "Notes not found", data: [] });
  }
};

const createNote = async (req, res) => {
  const { title, content, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const note = await Note.create({
    title,
    content,
    category,
    user: req.user.id,
  });

  const io = req.app.get("io");
  io.to(req.user.id).emit("noteCreated", note);

  res.status(201).json(note);
};

const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const io = req.app.get("io");
  io.to(req.user.id).emit("noteUpdated", updatedNote);

  res.status(200).json(updatedNote);
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  await note.deleteOne();

  const io = req.app.get("io");
  io.to(req.user.id).emit("noteDeleted", req.params.id);

  res.status(200).json({ id: req.params.id });
};

const getCategories = async (req, res) => {
  const categories = await Note.distinct("category", { user: req.user.id });
  res.status(200).json(categories);
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getCategories,
};
