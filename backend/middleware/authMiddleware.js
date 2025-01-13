const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path as needed

const authenticate = async (req, res, next) => {
  try {
    // * Get token from HttpOnly cookie
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // * Get user from token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authenticate };
