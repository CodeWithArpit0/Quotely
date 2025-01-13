const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

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

    const username = firstName + " " + lastName;
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({ message: "User registerd successfully." });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

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
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
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
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ message: "User data found.", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).json({ message: "User not found." });

    res.status(200).json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword)
      return res.status(401).json({ message: "Current password is required" });
    if (!newPassword)
      return res.status(401).json({ message: "New password is required" });

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(404).json({ message: "Current password is incorrect" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      token: generateToken(user._id),
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
  getUserByEmail,
};
