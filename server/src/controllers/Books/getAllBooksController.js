import Book from "../../models/Book.model.js";

// frontend fetch request url => fetch("http://localhost:3000/api/books?page=1&limit=5")

export const getAllBooksController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); // Latest First | descending order

    const totalBooks = await Book.countDocuments();

    res.send({
      success: true,
      message: "Books fetched successfully",
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in fetching all books:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --------- Get Logged in user's books --------- //
export const getUserBooksController = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      message: "User books fetched successfully",
      books,
    });
  } catch (error) {
    console.log("Get user books error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
