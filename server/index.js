const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {  //listen an event
  console.log(`User Connected: ${socket.id}`);  //each id for the socket user

  socket.on("join_room", (data) => {  //listen an event called join_room
    socket.join(data);
    console.log(`room ${data} joined by user: ${socket.id}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING! Fsociety");
});
