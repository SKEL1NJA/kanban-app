const Workspace = require("../models/Workspace");

// CREATE WORKSPACE
exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create({
      name: req.body.name,
      owner: req.user._id,
      members: [
        {
          user: req.user._id,
          role: "admin",
        },
      ],
    });

    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET USER WORKSPACES
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    });

    res.json(workspaces);
  } catch (err) {
    res.status(500).json(err.message);
  }
};