const { Score } = require("../models");
const { Room } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    scores: async () => {
      return Score.find().sort({ highScore: -1 });
    },

    scoresElo: async () => {
      return Score.find().sort({ elo: -1 });
    },

    score: async (parent, { wallet }) => {
      return Score.findOne({ wallet: wallet });
    },
    rooms: async () => {
      return Room.find();
    },
    room: async (parent, { roomNumber }) => {
      return Room.findOne({ roomNumber: roomNumber });
    },
  },

  Mutation: {
    createVote: async (parent, args) => {
      console.log(args.elo);
      const vote = await Score.findOneAndUpdate(
        { _id: args._id },
        { $set: { [`highScore`]: args.elo } },
        { new: true }
      );
      return vote;
    },
    addUser: async (parent, { wallet }) => {
      // First we create the user
      const user = await Score.findOne({ wallet });

      if (user) {
        return user;
      } else {
        const user = await Score.create({ wallet });
        const token = signToken(user);
        return user;
      }
    },
    addUserName: async (parent, { wallet, userName }) => {
      // First we create the user
      const newUserName = await Score.findOneAndUpdate(
        { wallet: wallet },
        { $set: { userName: userName } },
        { new: true }
      );
      return newUserName
    },
    addRoom: async (
      parent,
      { wallet, roomNumber, roomTime, roomColor, elo }
    ) => {
      // First we create the user

      const room = await Room.create({
        wallet,
        roomNumber,
        roomTime,
        roomColor,
        elo,
      });
      const token = signToken(room);
      return { room };
    },
    startGame: async (parent, { roomNumber, wallet2 }) => {
      const vote = await Room.findOne(
        { roomNumber: roomNumber }
        // { $inc: { [`users`]: -1 } },
        // { new: true }
      );

      if (vote.wallet2 === "Waiting") {
        const help = await Room.findOneAndUpdate(
          { roomNumber: roomNumber },
          { $set: { wallet2: wallet2 } },
          { new: true }
        );
        return help;
      } else {
        return false;
      }
    },
    updateElo: async (parent, { wallet, elo, wallet2, wallet2elo }) => {
      const myElo = await Score.findOneAndUpdate(
        { wallet: wallet },
        { $set: { [`elo`]: elo } },
        { new: true }
      );
      const opponentElo = await Score.findOneAndUpdate(
        { wallet: wallet2 },
        { $set: { [`elo`]: wallet2elo } },
        { new: true }
      );
      return myElo & opponentElo;
    },
  },
};

module.exports = resolvers;
