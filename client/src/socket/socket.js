import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "https://kanban-api-6djm.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;