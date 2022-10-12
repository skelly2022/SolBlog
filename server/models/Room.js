const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const roomSchema = new Schema({
  wallet: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  roomNumber: {
    type: String,
  },

  roomTime: {
    type: String,
  },

  roomColor: {
    type: String,
  },

  wallet2: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
    default: "Waiting"
  },
  users: {
    type: Number,
    default: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Room = model("Rooms", roomSchema);

module.exports = Room;
