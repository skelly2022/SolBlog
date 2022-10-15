const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scoreSchema = new Schema({
  wallet: {
    type: String,
    required: 'You need to leave a Score!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  highScore: {
    type: Number,
    default: 1200,
    
  },
  elo: {
    type: Number,
    default: 1200,
    
  },

  userName: {
    type: String,
    default: "No Username"
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Score = model('Scores', scoreSchema);

module.exports = Score;
