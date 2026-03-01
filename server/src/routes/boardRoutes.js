const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createBoard,
  getBoards,
} = require("../controllers/boardController");

router.post("/", protect, createBoard);
router.get("/:workspaceId", protect, getBoards);

module.exports = router;