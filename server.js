const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(__dirname + "/index.html");
});

// socekt--
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connecte...");
  socket.on("message", (msg) => {
      socket.broadcast.emit('message',msg)
    // console.log(msg);

  });
  
});
