import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";
import socket from "../socket/socket";

import { DragDropContext } from "@hello-pangea/dnd";

export default function Board() {
  const { boardId } = useParams();

  const [lists, setLists] = useState([]);

  /* ===============================
     FETCH LISTS
  =============================== */
  const fetchLists = useCallback(async () => {
    try {
      const res = await API.get(`/lists/${boardId}`);
      setLists(res.data);
    } catch (err) {
      console.error("Fetch lists error:", err);
    }
  }, [boardId]);

  /* ===============================
     LOAD BOARD
  =============================== */
  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  /* ===============================
     REALTIME SOCKET LISTENER
  =============================== */
  useEffect(() => {
    socket.on("cardMoved", () => {
      fetchLists();
    });

    return () => {
      socket.off("cardMoved");
    };
  }, [fetchLists]);

  /* ===============================
     DRAG END
  =============================== */
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const cardId = result.draggableId;
    const targetListId =
      result.destination.droppableId;

    const newOrder =
      result.destination.index;

    try {
      await API.put("/cards/move", {
        cardId,
        targetListId,
        newOrder,
      });
    } catch (err) {
      console.error("Move card error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl mb-6">
        Realtime Kanban 🚀
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto">
          {lists.map((list) => (
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