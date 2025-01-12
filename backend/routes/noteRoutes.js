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

// All routes are protected
router.use(authenticate);

// Note routes
router.route("/").get(getNotes).post(createNote);

router.route("/:id").put(updateNote).delete(deleteNote);

// Get categories
router.get("/categories", getCategories);

module.exports = router;
