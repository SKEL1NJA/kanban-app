import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";

export default function Dashboard() {

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-3xl mb-6">
        Dashboard 🚀
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {workspaces.map(ws => (
          <div
            key={ws._id}
            onClick={() => navigate(`/workspace/${ws._id}`)}
            className="bg-slate-800 p-6 rounded cursor-pointer hover:bg-slate-700"
          >
            {ws.name}
          </div>
        ))}

      </div>
    </div>
  );
}