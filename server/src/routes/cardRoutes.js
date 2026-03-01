const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createCard,
  getCards,
} = require("../controllers/cardController");

router.post("/", protect, createCard);
router.get("/:listId", protect, getCards);

module.exports = router;