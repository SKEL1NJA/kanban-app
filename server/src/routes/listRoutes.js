const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createList,
  getLists,
} = require("../controllers/listController");

router.post("/", protect, createList);
router.get("/:boardId", protect, getLists);

module.exports = router;