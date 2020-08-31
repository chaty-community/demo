const bCrypt = require("bcryptjs");
const User = require("../../models").user;
const Room = require("../../models").room;
const Roomuser = require("../../models").roomsuser;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const logIn = async (req, res) => {
  const { name, password } = req.body;
  try {
    const currentUser = await User.findOne({
      where: { name },
    });
    if (currentUser === null) {
      const images = [
        "https://icooon-mono.com/i/icon_10010/icon_100101_64.png",
        "https://icooon-mono.com/i/icon_11215/icon_112151_64.png",
        "https://icooon-mono.com/i/icon_10069/icon_100691_64.png",
        "https://icooon-mono.com/i/icon_10606/icon_106061_64.png",
        "https://icooon-mono.com/i/icon_11067/icon_110671_64.png",
        "https://icooon-mono.com/i/icon_11343/icon_113431_64.png",
        "https://icooon-mono.com/i/icon_11068/icon_110681_64.png",
        "https://icooon-mono.com/i/icon_11087/icon_110871_64.png",
        "https://icooon-mono.com/i/icon_11088/icon_110881_64.png",
        "https://icooon-mono.com/i/icon_11089/icon_110891_64.png",
        "https://icooon-mono.com/i/icon_10906/icon_109061_64.png",
        "https://icooon-mono.com/i/icon_11090/icon_110901_64.png",
        "https://icooon-mono.com/i/icon_11075/icon_110751_64.png",
        "https://icooon-mono.com/i/icon_10950/icon_109501_64.png",
        "https://icooon-mono.com/i/icon_11077/icon_110771_64.png",
        "https://icooon-mono.com/i/icon_11205/icon_112051_64.png",
        "https://icooon-mono.com/i/icon_16007/icon_160071_64.png",
        "https://icooon-mono.com/i/icon_16042/icon_160421_64.png",
        "https://icooon-mono.com/i/icon_16043/icon_160431_64.png",
        "https://icooon-mono.com/i/icon_16072/icon_160721_64.png",
        "https://icooon-mono.com/i/icon_16050/icon_160501_64.png",
        "https://icooon-mono.com/i/icon_16051/icon_160511_64.png",
        "https://icooon-mono.com/i/icon_16052/icon_160521_64.png",
        "https://icooon-mono.com/i/icon_16053/icon_160531_64.png",
        "https://icooon-mono.com/i/icon_16054/icon_160541_64.png",
        "https://icooon-mono.com/i/icon_16055/icon_160551_64.png",
        "https://icooon-mono.com/i/icon_15964/icon_159641_64.png",
        "https://icooon-mono.com/i/icon_15801/icon_158011_64.png",
        "https://icooon-mono.com/i/icon_15965/icon_159651_64.png",
        "https://icooon-mono.com/i/icon_15802/icon_158021_64.png",
        "https://icooon-mono.com/i/icon_15955/icon_159551_64.png",
        "https://icooon-mono.com/i/icon_15966/icon_159661_64.png",
        "https://icooon-mono.com/i/icon_15848/icon_158481_64.png",
        "https://icooon-mono.com/i/icon_16216/icon_162161_64.png",
        "https://icooon-mono.com/i/icon_16210/icon_162101_64.png",
        "https://icooon-mono.com/i/icon_15918/icon_159181_64.png",
        "https://icooon-mono.com/i/icon_16217/icon_162171_64.png",
        "https://icooon-mono.com/i/icon_16154/icon_161541_64.png",
        "https://icooon-mono.com/i/icon_16163/icon_161631_64.png",
        "https://icooon-mono.com/i/icon_16208/icon_162081_64.png",
        "https://icooon-mono.com/i/icon_16208/icon_162081_64.png",
        "https://icooon-mono.com/i/icon_16101/icon_161011_64.png",
        "https://icooon-mono.com/i/icon_15744/icon_157441_64.png",
        "https://icooon-mono.com/i/icon_15783/icon_157831_64.png",
        "https://icooon-mono.com/i/icon_15171/icon_151711_64.png",
        "https://icooon-mono.com/i/icon_15081/icon_150811_64.png",
        "https://icooon-mono.com/i/icon_15421/icon_154211_64.png",
        "https://icooon-mono.com/i/icon_15083/icon_150831_64.png",
        "https://icooon-mono.com/i/icon_15786/icon_157861_64.png",
        "https://icooon-mono.com/i/icon_15327/icon_153271_64.png",
        "https://icooon-mono.com/i/icon_15189/icon_151891_64.png",
        "https://icooon-mono.com/i/icon_15118/icon_151181_64.png",
        "https://icooon-mono.com/i/icon_15287/icon_152871_64.png",
        "https://icooon-mono.com/i/icon_15256/icon_152561_64.png",
        "https://icooon-mono.com/i/icon_14330/icon_143301_64.png",
        "https://icooon-mono.com/i/icon_14638/icon_146381_64.png",
        "https://icooon-mono.com/i/icon_14767/icon_147671_64.png",
        "https://icooon-mono.com/i/icon_14421/icon_144211_64.png",
      ];
      const img = images[Math.floor(Math.random() * images.length)];
      const password_hash = bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(8),
        null
      );
      const newUser = await User.create({
        name,
        img,
        password_hash,
        status_message: "",
      });
      let users = await User.findAll({
        where: {
          id: {
            [Op.not]: newUser.id,
          },
        },
      });
      for (let user of users) {
        const newRoom = await Room.create();
        await Roomuser.create({ user_id: newUser.id, room_id: newRoom.id });
        await Roomuser.create({ user_id: user.id, room_id: newRoom.id });
      }
      res.status(200).json({ currentUser: newUser });
      return;
    }
    if (!bCrypt.compareSync(password, currentUser.password_hash)) {
      res.status(404).json({ error: "パスワードが間違っています。" });
      return;
    }
    res.status(200).json({ currentUser });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラーです。" });
  }
};

const setProfile = async (req, res) => {
  const id = req.param("id");
  const { name, statusMessage } = req.body;
  try {
    const user = await User.findOne({
      where: { id },
    });
    user.name = name;
    user.status_message = statusMessage;
    const updatedUser = await user.save();
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
};

const getFriends = async (req, res) => {
  const user_id = req.param("id");
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: user_id,
        },
      },
    });
    res.status(200).json({ friends: users });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
};

module.exports = {
  logIn,
  setProfile,
  getFriends,
};
