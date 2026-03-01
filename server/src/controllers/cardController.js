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

// Move card logic
exports.moveCard = async (req, res) => {
  try {
    const { cardId, targetListId, newOrder } = req.body;

    const card = await Card.findById(cardId);

    if (!card)
      return res.status(404).json({ message: "Card not found" });

    const sourceListId = card.list;
    const oldOrder = card.order;

    // ✅ Fix source list order
    await Card.updateMany(
      {
        list: sourceListId,
        order: { $gt: oldOrder },
      },
      { $inc: { order: -1 } }
    );

    // ✅ Shift target list cards
    await Card.updateMany(
      {
        list: targetListId,
        order: { $gte: newOrder },
      },
      { $inc: { order: 1 } }
    );

    // ✅ Move card
    card.list = targetListId;
    card.order = newOrder;

    await card.save();

    // ✅ REALTIME EVENT
    const io = req.app.get("io");

    io.emit("cardMoved", {
      card,
    });

    res.json({
      message: "Card moved successfully",
      card,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};