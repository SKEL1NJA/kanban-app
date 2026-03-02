import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ListColumn({ list }) {

  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ fetch cards
  const fetchCards = async () => {
    try {
      const res = await API.get(`/cards/${list._id}`);
      setCards(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [list._id]);

  // ✅ create card
  const createCard = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/cards", {
        title,
        listId: list._id,
      });

      setCards(prev => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-800 w-72 p-4 rounded">

      <h2 className="font-bold mb-4">
        {list.title}
      </h2>

      {/* CARDS */}
      <div className="space-y-3">
        {cards.map(card => (
          <div
            key={card._id}
            className="bg-gray-700 p-3 rounded"
          >
            {card.title}
          </div>
        ))}
      </div>

      {/* ADD CARD */}
      <div className="mt-4">
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Add card"
          className="w-full p-2 text-black rounded mb-2"
        />

        <button
          onClick={createCard}
          className="bg-blue-500 w-full py-1 rounded"
        >
          Add Card
        </button>
      </div>

    </div>
  );
}