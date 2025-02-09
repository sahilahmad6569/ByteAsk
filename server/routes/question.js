const express = require("express");
const Question = require("../models/Question"); // Import Question Model
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication
const router = express.Router();

// ✅ Get Latest Questions (Sorted by Most Recent)
router.get("/latest", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).limit(10);
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get All Questions (Paginated)
router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const questions = await Question.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalQuestions = await Question.countDocuments();

    res.json({ questions, totalPages: Math.ceil(totalQuestions / limit), currentPage: page });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Create a New Question (Authenticated Users Only)
router.post(
  "/create",
  authMiddleware,
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description must be at least 10 characters").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tags } = req.body;
      const newQuestion = new Question({
        title,
        description,
        tags,
        author: req.user.id, // Logged-in User ID from Middleware
        createdAt: new Date(),
      });

      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
