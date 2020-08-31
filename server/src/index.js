const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const apiServer = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + apiServer.address().port);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    room_id: 1,
    messages: [
      { message: "ヤッホー" },
      { message: "元気？" },
      { message: "僕元気！" },
    ],
  });
});

const { logIn, setProfile, getFriends } = require("./api/users");

app.post("/api/users/session", (req, res) => {
  logIn(req, res);
});

app.post("/api/users/:id/edit", (req, res) => {
  setProfile(req, res);
});

app.post("/api/users/:id/friends", (req, res) => {
  getFriends(req, res);
});

const { findRoomId, getMessages, sendMessage } = require("./api/rooms");

app.post("/api/users/:id/find_room_id", (req, res) => {
  findRoomId(req, res);
});

app.get("/api/rooms/:id/messages", (req, res) => {
  getMessages(req, res);
});

app.post("/api/rooms/:id/message", (req, res) => {
  sendMessage(req, res);
});
