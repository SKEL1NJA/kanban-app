import { useEffect } from "react";
import API from "../api/axios";

export default function Dashboard() {

  useEffect(() => {
    const testAPI = async () => {
      try {
        const res = await API.get("/workspaces");
        console.log(res.data);
      } catch (err) {
        console.log("API Error:", err.response?.data);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-3xl">Dashboard 🚀</h1>
    </div>
  );
}