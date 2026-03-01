import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Load workspaces on page load
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.error("Error fetching workspaces:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create workspace
  const createWorkspace = async () => {
    if (!workspaceName.trim()) return;

    try {
      const res = await API.post("/workspaces", {
        name: workspaceName,
      });

      // update UI instantly
      setWorkspaces((prev) => [...prev, res.data]);

      setWorkspaceName("");
    } catch (err) {
      console.error("Create workspace error:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard 🚀
      </h1>

      {/* ✅ CREATE WORKSPACE */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Workspace name"
          value={workspaceName}
          onChange={(e) =>
            setWorkspaceName(e.target.value)
          }
          className="p-2 rounded text-black w-64"
        />

        <button
          onClick={createWorkspace}
          className="bg-blue-500 px-5 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* ✅ WORKSPACE LIST */}
      {workspaces.length === 0 ? (
        <p>No workspaces found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <div
              key={ws._id}
              className="bg-slate-800 p-6 rounded-lg shadow hover:bg-slate-700 transition"
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