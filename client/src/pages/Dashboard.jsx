import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {

  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createWorkspace = async () => {
    if (!workspaceName.trim()) return;

    try {
      const res = await API.post("/workspaces", {
        name: workspaceName,
      });

      setWorkspaces((prev) => [...prev, res.data]);
      setWorkspaceName("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard 🚀
      </h1>

      {/* Create Workspace */}
      <div className="flex gap-3 mb-8">
        <input
          value={workspaceName}
          onChange={(e) =>
            setWorkspaceName(e.target.value)
          }
          placeholder="Workspace name"
          className="p-2 rounded text-black"
        />

        <button
          onClick={createWorkspace}
          className="bg-blue-500 px-5 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* Workspace List */}
      {workspaces.length === 0 ? (
        <p>No workspaces found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <div
              key={ws._id}
              onClick={() =>
                navigate(`/workspace/${ws._id}`)
              }
              className="bg-slate-800 p-6 rounded-lg shadow hover:bg-slate-700 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold">
                {ws.name}
              </h2>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}