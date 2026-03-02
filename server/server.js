require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/workspaces", require("./src/routes/workspaceRoutes"));
app.use("/api/boards", require("./src/routes/boardRoutes"));
app.use("/api/lists", require("./src/routes/listRoutes"));
app.use("/api/cards", require("./src/routes/cardRoutes"));

/* SERVER */
const server = http.createServer(app);

/* SOCKET */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

/* make io globally accessible */
app.set("io", io);

/* DB */
mongoose
  .connect("mongodb://127.0.0.1:27017/kanban")
  .then(() => console.log("Mongo Connected"));

server.listen(5000, () =>
  console.log("Server running on 5000")
);