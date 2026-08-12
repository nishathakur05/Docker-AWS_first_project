// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import { SocketIOProvider } from "y-socket.io";
// import { YSocketIO } from "y-socket.io/dist/server"


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import { YSocketIO } from "y-socket.io/dist/server";
// const app = express();
// app.use(express.static("public"));

// const server = http.createServer(app);
//app.use(express.static("public"));

// const io = new Server(server, {
// cors: {
// origin: "*"
// }
// });

// const ysocketio = new YSocketIO(io);
// ysocketio.initialize();


// //app.get("/", (req, res) => {
// // res.send("Backend is running "); //message API
// //});

// app.get("/", (req, res) => {
// res.send("Hello Nisha"); //message API
// });



// io.on("connection", (socket) => {
// console.log("User Connected:", socket.id);

// socket.on("disconnect", () => {
// console.log("User Disconnected:", socket.id);
// });
// });

// const PORT = 3000;

// server.listen(PORT, () => {
// console.log(`Server is running on http://localhost:${PORT}`);
// });


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import { YSocketIO } from "y-socket.io/dist/server";

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const ysocketio = new YSocketIO(io);
// ysocketio.initialize();

// app.get("/", (req, res) => {
//   res.send("Hello Nisha");
// });

// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User Disconnected:", socket.id);
//   });
// });

// const PORT = 3000;

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




import express from "express";

import http from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";





const app = express();
// app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Serve React frontend
app.use(express.static("public"));


// Y-Socket.IO
const ysocketio = new YSocketIO(io);
ysocketio.initialize();

// Test API
// app.get("/", (req, res) => {
//   res.send("Hello Nisha");
// });

// Normal Socket.IO connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

