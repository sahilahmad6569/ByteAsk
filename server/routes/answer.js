const express = require("express");
const Answer = require("../models/Answer");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Post an Answer (Authenticated Users Only)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { questionId, content } = req.body;

    if (!questionId || !content) {
      return res.status(400).json({ error: "Question ID and content are required." });
    }

    const newAnswer = new Answer({
      questionId,
      author: req.user.id,
      content,
    });

    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    console.error("Error posting answer:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Get Answers for a Question
router.get("/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;