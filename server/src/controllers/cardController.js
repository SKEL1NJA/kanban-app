const Card = require("../models/Card");
const List = require("../models/List");

// CREATE CARD
exports.createCard = async (req, res) => {
  try {
    const { title, description, listId } = req.body;

    const list = await List.findById(listId);

    if (!list)
      return res.status(404).json({ message: "List not found" });

    const cardsCount = await Card.countDocuments({
      list: listId,
    });

    const card = await Card.create({
      title,
      description,
      list: listId,
      order: cardsCount,
      createdBy: req.user._id,
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET CARDS OF LIST
exports.getCards = async (req, res) => {
  try {
    const { listId } = req.params;

    const cards = await Card.find({
      list: listId,
    }).sort("order");

    res.json(cards);
  } catch (err) {
    res.status(500).json(err.message);
  }
};