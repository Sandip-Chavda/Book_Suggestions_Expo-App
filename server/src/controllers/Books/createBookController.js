import "dotenv/config";
import cloudinary from "../../lib/cloudinary.js";
import Book from "../../models/Book.model.js";

export const createBookController = async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "Please fill all fields!" });
    }

    // Upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    await newBook.save();

    res
      .status(201)
      .json({ success: true, message: "Book created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error, While creating a book!",
    });
  }
};
