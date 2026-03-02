import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";
import socket from "../socket/socket";

import {
  DragDropContext,
} from "@hello-pangea/dnd";

export default function Board() {

  const { boardId } = useParams();

  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    const res = await API.get(`/lists/${boardId}`);
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  /* ✅ REALTIME LISTENER */
  useEffect(() => {

    socket.on("cardMoved", () => {
      fetchLists();
    });

    return () => {
      socket.off("cardMoved");
    };

  }, []);

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const { draggableId, destination } = result;

    await API.put("/cards/move", {
      cardId: draggableId,
      targetListId: destination.droppableId,
      newOrder: destination.index,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl mb-6">
        Realtime Kanban 🚀
      </h1>

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