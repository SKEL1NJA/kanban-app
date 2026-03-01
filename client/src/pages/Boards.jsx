import { useParams } from "react-router-dom";

export default function Boards() {

  const { workspaceId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-4">
        Boards Page 🚀
      </h1>

      <p>
        Workspace ID:
        <span className="text-blue-400 ml-2">
          {workspaceId}
        </span>
      </p>

    </div>
  );
}