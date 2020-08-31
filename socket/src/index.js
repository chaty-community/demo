const io = require('socket.io')();
io.on("connection", (socket) => {
  console.log("[WebSocket Connected!]");
  socket.on("createMessage", (message) => {
    io.emit("newMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("[WebSocket DisConnected.]");
  });
});
io.listen(8080);