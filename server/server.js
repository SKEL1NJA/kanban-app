require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./src/app");
const connectDB = require("./src/config/db");

// ✅ Connect Database FIRST
connectDB();

// ✅ Create HTTP Server
const server = http.createServer(app);

// ✅ Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Make io accessible inside controllers
app.set("io", io);

// ✅ Socket Connection
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join board room
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`User joined board ${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});