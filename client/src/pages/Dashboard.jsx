import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {

  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();

  // ✅ FUNCTION FIRST
  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ THEN useEffect
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl mb-6">Dashboard 🚀</h1>

      <div className="grid grid-cols-3 gap-4">
        {workspaces.map(ws => (
          <div
            key={ws._id}
            onClick={() => navigate(`/workspace/${ws._id}`)}
            className="bg-slate-800 p-6 rounded cursor-pointer"
          >
            {ws.name}
          </div>
        ))}
      </div>

    </div>
  );
}