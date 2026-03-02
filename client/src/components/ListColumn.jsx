import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../api/axios";

import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function ListColumn({ list }) {

  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");

  const fetchCards = async () => {
    const res = await API.get(`/cards/${list._id}`);
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, [list._id]);

  const createCard = async () => {

    if (!title.trim()) return;

    try {
      const res = await API.post("/cards", {
        title,
        listId: list._id,
      });

      setCards(prev => [...prev, res.data]);
      setTitle("");

      toast.success("Card added ✅");

    } catch {
      toast.error("Card creation failed");
    }
  };

  return (
    <div className="bg-slate-800 w-64 p-4 rounded">

      <h2 className="font-semibold mb-4">
        {list.title}
      </h2>

      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[50px]"
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
                    className="bg-gray-700 p-2 mb-2 rounded"
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

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="New card"
        className="p-2 mt-3 w-full text-black rounded"
      />

      <button
        onClick={createCard}
        className="bg-blue-500 w-full mt-2 py-1 rounded"
      >
        Add Card
      </button>

    </div>
  );
}