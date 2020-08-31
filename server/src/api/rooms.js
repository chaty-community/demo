const Message = require("../../models").message;
const Room = require("../../models").room;
const Roomuser = require("../../models").roomsuser;

const findRoomId = async (req, res) => {
  const currentUserId = req.param("id");
  const { friendId } = req.body;
  try {
    const rooms = await Room.findAll({
      include: [{ model: Roomuser }],
    });
    let currentRoomId = 0;
    rooms.map((room) => {
      if (
        Number(currentUserId) == room.dataValues.roomsusers[0].user_id &&
        friendId == room.dataValues.roomsusers[1].user_id
      ) {
        currentRoomId = room.id;
        return;
      }
      if (
        Number(currentUserId) == room.dataValues.roomsusers[1].user_id &&
        friendId == room.dataValues.roomsusers[0].user_id
      ) {
        currentRoomId = room.id;
      }
      return;
    });
    res.status(200).json({ currentRoomId });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
};

const getMessages = async (req, res) => {
  const room_id = req.param("id");
  try {
    const messages = await Message.findAll({
      where: { room_id: room_id },
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
};

const sendMessage = async (req, res) => {
  const room_id = req.param("id");
  const { message, current_user_id } = req.body;
  try {
    const postMessage = await Message.create({
      message,
      room_id,
      user_id: current_user_id,
    });
    res.status(201).json({ postMessage });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
};

module.exports = {
  findRoomId,
  getMessages,
  sendMessage,
};
