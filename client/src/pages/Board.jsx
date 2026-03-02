import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ListColumn from "../components/ListColumn";

export default function Board() {

  const { boardId } = useParams();

  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ FUNCTION FIRST
  const fetchLists = async () => {
    const res = await API.get(`/lists/${boardId}`);
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  const createList = async () => {
    if (!title.trim()) return;

    const res = await API.post("/lists", {
      title,
      boardId,
    });

    setLists(prev => [...prev, res.data]);
    setTitle("");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl mb-6">Kanban Board 🚀</h1>

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="List title"
        className="p-2 text-black mr-2"
      />

      <button
        onClick={createList}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Add List
      </button>

      <div className="flex gap-6 mt-6 overflow-x-auto">
        {lists.map(list => (
          <ListColumn key={list._id} list={list}/>
        ))}
      </div>

    </div>
  );
}