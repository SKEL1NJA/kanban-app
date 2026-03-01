const List = require("../models/List");
const Board = require("../models/Board");

// CREATE LIST
exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const board = await Board.findById(boardId);

    if (!board)
      return res.status(404).json({ message: "Board not found" });

    const listsCount = await List.countDocuments({
      board: boardId,
    });

    const list = await List.create({
      title,
      board: boardId,
      order: listsCount,
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET LISTS OF BOARD
exports.getLists = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({
      board: boardId,
    }).sort("order");

    res.json(lists);
  } catch (err) {
    res.status(500).json(err.message);
  }
};