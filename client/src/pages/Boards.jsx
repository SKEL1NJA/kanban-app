import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import Loader from "../components/Loader";

export default function Boards() {

  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      const res = await API.get(`/boards/${workspaceId}`);
      setBoards(res.data);
    } catch {
      toast.error("Failed to load boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [workspaceId]);

  const createBoard = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/boards", {
        title,
        workspaceId,
      });

      setBoards(prev => [...prev, res.data]);
      setTitle("");

      toast.success("Board created 🎉");

    } catch {
      toast.error("Failed to create board");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-2xl mb-4">
        Boards
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Board"
          className="p-2 text-black rounded"
        />

        <button
          onClick={createBoard}
          className="bg-blue-500 px-4 rounded"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">

        {boards.map(board => (
          <div
            key={board._id}
            onClick={() =>
              navigate(`/board/${board._id}`)
            }
            className="bg-slate-800 p-6 rounded cursor-pointer hover:bg-slate-700"
          >
            {board.title}
          </div>
        ))}

      </div>
    </div>
  );
}