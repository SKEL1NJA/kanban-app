import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Boards() {

  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ FIRST
  const fetchBoards = async () => {
    const res = await API.get(`/boards/${workspaceId}`);
    setBoards(res.data);
  };

  // ✅ THEN
  useEffect(() => {
    fetchBoards();
  }, [workspaceId]);

  const createBoard = async () => {
    if (!title.trim()) return;

    const res = await API.post("/boards", {
      title,
      workspaceId,
    });

    setBoards(prev => [...prev, res.data]);
    setTitle("");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-2xl mb-4">Boards</h1>

      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Board name"
        className="p-2 text-black mr-2"
      />

      <button
        onClick={createBoard}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Create
      </button>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {boards.map(board => (
          <div
            key={board._id}
            onClick={()=>navigate(`/board/${board._id}`)}
            className="bg-slate-800 p-5 rounded cursor-pointer"
          >
            {board.title}
          </div>
        ))}
      </div>

    </div>
  );
}