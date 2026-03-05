import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";
import socket from "../socket/socket";
import Loader from "../components/Loader";

import { DragDropContext } from "@hello-pangea/dnd";

export default function Board() {

  const { boardId } = useParams();

  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    try {
      const res = await API.get(`/lists/${boardId}`);
      setLists(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  /* REALTIME LISTENER */

  useEffect(() => {

    socket.on("cardMoved", () => {
      fetchLists();
    });

    return () => {
      socket.off("cardMoved");
    };

  }, []);

  /* CREATE LIST */

  const createList = async () => {

    if (!title.trim()) return;

    const res = await API.post("/lists", {
      title,
      boardId
    });

    setLists(prev => [...prev, res.data]);
    setTitle("");
  };

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const { draggableId, destination } = result;

    await API.put("/cards/move", {
      cardId: draggableId,
      targetListId: destination.droppableId,
      newOrder: destination.index,
    });

  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl mb-6">
        Realtime Kanban 🚀
      </h1>

      {/* CREATE LIST */}

      <div className="flex gap-2 mb-6">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New List"
          className="p-2 text-black rounded"
        />

        <button
          onClick={createList}
          className="bg-green-500 px-4 rounded"
        >
          Create
        </button>

      </div>

      {/* LISTS */}

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="flex gap-6 overflow-x-auto">

          {lists.length === 0 ? (

            <p className="text-gray-400">
              No lists yet. Create one above 👆
            </p>

          ) : (

            lists.map(list => (
              <ListColumn
                key={list._id}
                list={list}
              />
            ))

          )}

        </div>

      </DragDropContext>

    </div>
  );
}