import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";
import socket from "../socket/socket";

import { DragDropContext } from "@hello-pangea/dnd";

export default function Board() {

  const { boardId } = useParams();
  const [lists, setLists] = useState([]);

  /* ================= FETCH ================= */

  const fetchLists = async () => {
    const res = await API.get(`/lists/${boardId}`);
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  /* ================= REALTIME ================= */

  useEffect(() => {
    socket.on("cardMoved", fetchLists);

    return () => {
      socket.off("cardMoved");
    };
  }, []);

  /* ================= OPTIMISTIC MOVE ================= */

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const { draggableId, source, destination } = result;

    /* ✅ FIND SOURCE + DEST LIST */
    const sourceListIndex = lists.findIndex(
      l => l._id === source.droppableId
    );

    const destListIndex = lists.findIndex(
      l => l._id === destination.droppableId
    );

    const newLists = [...lists];

    const sourceCards = [...newLists[sourceListIndex].cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    const destCards =
      sourceListIndex === destListIndex
        ? sourceCards
        : [...newLists[destListIndex].cards];

    destCards.splice(destination.index, 0, movedCard);

    newLists[sourceListIndex].cards = sourceCards;
    newLists[destListIndex].cards = destCards;

    /* ✅ INSTANT UI UPDATE */
    setLists(newLists);

    /* ✅ BACKEND UPDATE */
    try {
      await API.put("/cards/move", {
        cardId: draggableId,
        targetListId: destination.droppableId,
        newOrder: destination.index,
      });
    } catch (err) {
      console.error(err);
      fetchLists(); // rollback if failed
    }
  };

  /* ================= UI ================= */

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