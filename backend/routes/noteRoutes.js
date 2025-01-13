// backend/routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getCategories,
} = require("../controllers/noteController");
const { authenticate } = require("../middleware/authMiddleware");

router.use(authenticate);

router.route("/").get(getNotes).post(createNote);

router.route("/:id").put(updateNote).delete(deleteNote);

router.get("/categories", getCategories);

module.exports = router;
