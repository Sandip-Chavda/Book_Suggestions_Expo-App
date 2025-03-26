import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "User not authorized" });
  }
};
