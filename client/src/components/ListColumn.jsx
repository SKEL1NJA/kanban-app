import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ListColumn({ list }) {

  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH CARDS
  // =========================
  useEffect(() => {
    fetchCards();
  }, [list._id]);

  const fetchCards = async () => {
    try {
      const res = await API.get(`/cards/${list._id}`);
      setCards(res.data);
    } catch (err) {
      console.error("Fetch cards error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE CARD
  // =========================
  const createCard = async () => {
    if (!cardTitle.trim()) return;

    try {
      const res = await API.post("/cards", {
        title: cardTitle,
        description: "",
        listId: list._id,
      });

      setCards((prev) => [...prev, res.data]);
      setCardTitle("");

    } catch (err) {
      console.error("Create card error:", err);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="bg-slate-800 w-72 p-4 rounded flex-shrink-0">

      {/* LIST TITLE */}
      <h2 className="text-lg font-semibold mb-4">
        {list.title}
      </h2>

      {/* ADD CARD */}
      <div className="mb-4">
        <input
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Add card..."
          className="w-full p-2 text-black rounded mb-2"
        />

        <button
          onClick={createCard}
          className="bg-blue-500 w-full py-1 rounded"
        >
          Add Card
        </button>
      </div>

      {/* CARDS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">

          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-gray-700 p-3 rounded shadow"
            >
              <p>{card.title}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}