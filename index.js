const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/database-config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("msg_send", (data) => {
    // console.log("event coming from client", data);
    // io.emit("msg_rcvd", data);
    // socket.emit("msg_rcvd", data);
    socket.broadcast.emit("msg_rcvd", data);
  });
});

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomid", (req, res) => {
  res.render("index", {
    name: "Rajan",
    id: req.params.roomid,
  });
});

server.listen(3000, async () => {
  console.log(`server is started`);
  await connect();
  console.log("mongodb connected");
});
