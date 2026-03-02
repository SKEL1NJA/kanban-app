const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCard,
  getCards,
  moveCard,
} = require("../controllers/cardController");

router.post("/", protect, createCard);
router.get("/:listId", protect, getCards);
router.put("/move", protect, moveCard);

module.exports = router;