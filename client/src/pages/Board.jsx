import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";

import {
  DragDropContext,
} from "@hello-pangea/dnd";

export default function Board() {

  const { boardId } = useParams();

  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH LISTS
  const fetchLists = async () => {
    try {
      const res = await API.get(`/lists/${boardId}`);
      setLists(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  // ✅ CREATE LIST
  const createList = async () => {
    if (!listTitle.trim()) return;

    try {
      const res = await API.post("/lists", {
        title: listTitle,
        boardId,
      });

      setLists(prev => [...prev, res.data]);
      setListTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DRAG END HANDLER
  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const { draggableId, destination } = result;

    try {
      await API.put("/cards/move", {
        cardId: draggableId,
        targetListId: destination.droppableId,
        newOrder: destination.index,
      });

      fetchLists();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
        Loading Board...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl mb-6">
        Kanban Board 🚀
      </h1>

      {/* CREATE LIST */}
      <div className="flex gap-3 mb-6">
        <input
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="List title"
          className="p-2 rounded text-black"
        />

        <button
          onClick={createList}
          className="bg-blue-500 px-4 rounded"
        >
          Add List
        </button>
      </div>

      {/* ✅ DRAG CONTEXT */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto">

          {lists.map(list => (
            <ListColumn
              key={list._id}
              list={list}
            />
          ))}

        </div>
      </DragDropContext>

    </div>
  );
}