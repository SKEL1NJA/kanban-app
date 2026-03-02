import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function ListColumn({ list }) {

  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ FETCH CARDS
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

  // ✅ CREATE CARD
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
    <div className="bg-slate-800 w-64 p-4 rounded">

      <h2 className="font-semibold mb-4">
        {list.title}
      </h2>

      {/* ADD CARD */}
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card title"
          className="text-black p-1 rounded w-full"
        />

        <button
          onClick={createCard}
          className="bg-blue-500 px-2 rounded"
        >
          +
        </button>
      </div>

      {/* ✅ DROP ZONE */}
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[20px]"
          >

            {cards.map((card, index) => (
              <Draggable
                key={card._id}
                draggableId={card._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-700 p-3 rounded cursor-grab"
                  >
                    {card.title}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>

    </div>
  );
}