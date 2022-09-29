const { Score } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    scores: async () => {
      return Score.find().sort({ createdAt: -1 });
    },

    score: async (parent, { wallet }) => {
      return Score.findOne({ wallet: wallet });
    },
  },

  Mutation: {
    createVote: async (parent, { _id}) => {
      const vote = await Score.findOneAndUpdate(
        { _id },
        { $inc: { [`highScore`]: -1} },
        { new: true }
      );
      return vote;
    },
    addUser: async (parent, { wallet}) => {
        // First we create the user
        const user = await  Score.findOne({ wallet });
        
        if (user) { 
         
          return user
        }
        else {
          const user = await Score.create( {wallet});
          const token = signToken(user);
          return {token, user}
          
        }
      },
  },
};

module.exports = resolvers;
