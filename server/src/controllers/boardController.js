const Board = require("../models/Board");
const Workspace = require("../models/Workspace");

// CREATE BOARD
exports.createBoard = async (req, res) => {
  try {
    const { title, workspaceId } = req.body;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });

    const isMember = workspace.members.some(
      m => m.user.toString() === req.user._id.toString()
    );

    if (!isMember)
      return res.status(403).json({ message: "Access denied" });

    const board = await Board.create({
      title,
      workspace: workspaceId,
      createdBy: req.user._id,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET BOARDS OF WORKSPACE
exports.getBoards = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const boards = await Board.find({
      workspace: workspaceId,
    });

    res.json(boards);
  } catch (err) {
    res.status(500).json(err.message);
  }
};