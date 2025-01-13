const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserByEmail,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/getUser", getUserByEmail);

router.get("/profile", authenticate, getUserProfile);
router.put("/updateProfile", authenticate, updateUserProfile);
router.put("/changePassword", authenticate, changePassword);

module.exports = router;
