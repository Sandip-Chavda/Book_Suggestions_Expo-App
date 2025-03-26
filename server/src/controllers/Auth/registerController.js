import "dotenv/config";
import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
      });
    }

    // check if user already exists both same email and username

    //   const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    //   if (existingUser) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "User already exists with that email or username",
    //     });
    //   }

    // check user exists with email

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with that email",
      });
    }

    // check user exists with username

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "User already exists with that username",
      });
    }

    // get random profile image
    const profileImage = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;

    const user = new User({
      username,
      email,
      password,
      profileImage,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Register error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
