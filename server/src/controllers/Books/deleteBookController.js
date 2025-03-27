import cloudinary from "../../lib/cloudinary.js";
import Book from "../../models/Book.model.js";

export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    // Check the user is the creator of the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this book!",
      });
    }

    // Delete image from cloudinary
    // Clodinary public url = https://res.cloudinary.com/dx3x66x5t/image/upload/v1631015459/Books/1631015458947.jpg
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.log("Error in deleting image from cloudinary!", deleteError);
      }
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.log("Error in delete book!", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
