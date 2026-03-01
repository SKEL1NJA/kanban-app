import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">Dashboard 🚀</h1>

      {workspaces.length === 0 ? (
        <p>No workspaces found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <div
              key={ws._id}
              className="bg-slate-800 p-5 rounded-lg"
            >
              <h2 className="text-xl">{ws.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}