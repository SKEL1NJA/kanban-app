const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const workspaceRoutes = require("./routes/workspaceRoutes");

app.use("/api/workspaces", workspaceRoutes);

const boardRoutes = require("./routes/boardRoutes");

app.use("/api/boards", boardRoutes);