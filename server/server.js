require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

/* ROUTES */

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/workspaces", require("./src/routes/workspaceRoutes"));
app.use("/api/boards", require("./src/routes/boardRoutes"));
app.use("/api/lists", require("./src/routes/listRoutes"));
app.use("/api/cards", require("./src/routes/cardRoutes"));

/* SERVER */

const server = http.createServer(app);

/* SOCKET.IO */

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.set("io", io);

/* DATABASE */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err));

/* START SERVER */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});