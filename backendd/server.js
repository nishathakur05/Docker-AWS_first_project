import express from "express";
import http from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// React frontend ka dist folder serve karo
const frontendPath = path.join(
  __dirname,
  "../frontend/dist"
);

app.use(express.static(frontendPath));

// Y-Socket.IO
const ysocketio = new YSocketIO(io);

ysocketio.initialize();

// Socket connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// React fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(
    path.join(frontendPath, "index.html")
  );
});

// Server
const PORT = 3000;

server.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});