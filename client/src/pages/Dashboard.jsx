import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import Loader from "../components/Loader";

export default function Dashboard() {

  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  /* Fetch Workspaces */

  const fetchWorkspaces = async () => {
    try {

      const res = await API.get("/workspaces");

      setWorkspaces(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load workspaces");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  /* Create Workspace */

  const createWorkspace = async () => {

    if (!name.trim()) return;

    try {

      const res = await API.post("/workspaces", {
        name
      });

      setWorkspaces(prev => [...prev, res.data]);

      setName("");

      toast.success("Workspace created 🚀");

    } catch (err) {

      console.error(err);
      toast.error("Failed to create workspace");

    }
  };

  /* Loading */

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl mb-6">
        Dashboard 🚀
      </h1>

      {/* Create Workspace */}

      <div className="flex gap-2 mb-6">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Workspace"
          className="p-2 text-black rounded"
        />

        <button
          onClick={createWorkspace}
          className="bg-green-500 px-4 rounded hover:bg-green-600"
        >
          Create
        </button>

      </div>

      {/* Workspace List */}

      <div className="grid grid-cols-3 gap-4">

        {workspaces.length === 0 ? (

          <p className="text-gray-400">
            No workspaces yet. Create one above 👆
          </p>

        ) : (

          workspaces.map((ws) => (

            <div
              key={ws._id}
              onClick={() => navigate(`/workspace/${ws._id}`)}
              className="bg-slate-800 p-6 rounded cursor-pointer hover:bg-slate-700"
            >
              {ws.name}
            </div>

          ))

        )}

      </div>

    </div>
  );
}