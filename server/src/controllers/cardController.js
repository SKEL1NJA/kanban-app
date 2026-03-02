const Card = require("../models/Card");

/* ===============================
   CREATE CARD
================================ */
exports.createCard = async (req, res) => {
  try {
    const { title, description, listId } = req.body;

    const count = await Card.countDocuments({
      list: listId,
    });

    const card = await Card.create({
      title,
      description,
      list: listId,
      order: count,
      createdBy: req.user?._id,
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   GET CARDS
================================ */
exports.getCards = async (req, res) => {
  try {
    const { listId } = req.params;

    const cards = await Card.find({
      list: listId,
    }).sort("order");

    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   MOVE CARD (REALTIME)
================================ */
exports.moveCard = async (req, res) => {
  try {
    const { cardId, targetListId, newOrder } = req.body;

    const card = await Card.findById(cardId);

    if (!card)
      return res.status(404).json({
        message: "Card not found",
      });

    const sourceListId = card.list;
    const oldOrder = card.order;

    /* ✅ Fix source list */
    await Card.updateMany(
      {
        list: sourceListId,
        order: { $gt: oldOrder },
      },
      { $inc: { order: -1 } }
    );

    /* ✅ Shift target list */
    await Card.updateMany(
      {
        list: targetListId,
        order: { $gte: newOrder },
      },
      { $inc: { order: 1 } }
    );

    /* ✅ Move */
    card.list = targetListId;
    card.order = newOrder;

    await card.save();

    /* ✅ SOCKET EVENT */
    const io = req.app.get("io");

    io.emit("cardMoved", {
      cardId,
    });

    res.json({
      message: "Card moved",
      card,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};