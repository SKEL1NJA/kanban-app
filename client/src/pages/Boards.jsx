import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function Boards() {

  const { workspaceId } = useParams();

  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ fetch boards
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await API.get(`/boards/${workspaceId}`);
      setBoards(res.data);
    } catch (err) {
      console.error("Fetch boards error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ create board
  const createBoard = async () => {
    if (!boardName.trim()) return;

    try {
      const res = await API.post("/boards", {
        title: boardName,
        workspaceId,
      });

      setBoards((prev) => [...prev, res.data]);
      setBoardName("");
    } catch (err) {
      console.error("Create board error:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading Boards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Boards 🚀
      </h1>

      {/* Create Board */}
      <div className="flex gap-3 mb-8">
        <input
          value={boardName}
          onChange={(e) =>
            setBoardName(e.target.value)
          }
          placeholder="Board name"
          className="p-2 rounded text-black"
        />

        <button
          onClick={createBoard}
          className="bg-green-500 px-5 rounded hover:bg-green-600"
        >
          Create Board
        </button>
      </div>

      {/* Boards List */}
      {boards.length === 0 ? (
        <p>No boards yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board._id}
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold">
                {board.title}
              </h2>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}