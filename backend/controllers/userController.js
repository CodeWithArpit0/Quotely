const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 1000, // 1 hour,
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName)
      return res.status(401).json({ message: "First name is required" });
    if (!lastName)
      return res.status(401).json({ message: "Last name is required" });
    if (!email) return res.status(401).json({ message: "Email is required" });
    if (!password)
      return res.status(401).json({ message: "Password is required" });

    // Check if user exists
    const username = firstName + " " + lastName;
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
    });

    if (user) {
      res.status(201).json({ message: "User registerd successfully." });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(401).json({ message: "Email is required" });
    if (!password)
      return res.status(401).json({ message: "Password is required" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User doesn't exist, please signup.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
    } else {
      const accessToken = generateToken(user._id);
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: true, // Ensures cookie is only sent over HTTPS
        sameSite: "strict", // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.status(200).json({
        message: "User logged in successfully.",
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,  // Makes sure it's HttpOnly
    secure: process.env.NODE_ENV === 'production', // Secure cookie for HTTPS in production
    sameSite: 'strict',  // Prevents cross-site requests
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ message: "User data found.", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if email is being updated and is unique
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(404).json({ message: "Current password is incorrect" });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Update password
    user.password = newPassword; // Will be hashed by pre-save middleware
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      token: generateToken(user._id), // Provide new token after password change
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
