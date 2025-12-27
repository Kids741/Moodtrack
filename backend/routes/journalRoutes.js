import express from "express";
import Journal from "../models/Journal.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all journal entries for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new journal entry
router.post("/", protect, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newEntry = await Journal.create({
      userId: req.user.id,
      content: content.trim(),
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a journal entry
router.put("/:id", protect, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    entry.content = content.trim();
    await entry.save();

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a journal entry
router.delete("/:id", protect, async (req, res) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await Journal.deleteOne({ _id: req.params.id });
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
