// import jwt from "jsonwebtoken";
// import "dotenv/config";
// import User from "../models/User.model.js";

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers("Authorization").replace("Bearer ", "");

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not authorized" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "User not authorized" });
//   }
// };

import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Correct way to access the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header

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
    console.log("Auth Middleware Error:", error);
    res.status(500).json({ success: false, message: "User not authorized" });
  }
};
