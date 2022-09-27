const { Score } = require('../models');

const resolvers = {
  Query: {
    scores: async () => {
      return Score.find().sort({ createdAt: -1 });
    },

    score: async (parent, { scoreId }) => {
      return Score.findOne({ _id: scoreId });
    },
  },

  // Mutation: {
  //   addScore: async (parent, { wallet, highScore }) => {
  //     return Score.create({ wallet, highScore });
  //   },
  //   addComment: async (parent, { ScoreId, commentText }) => {
  //     return Score.findOneAndUpdate(
  //       { _id: ScoreId },
  //       {
  //         $addToSet: { comments: { commentText } },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   },
  //   removeScore: async (parent, { ScoreId }) => {
  //     return Score.findOneAndDelete({ _id: ScoreId });
  //   },
  //   removeComment: async (parent, { ScoreId, commentId }) => {
  //     return Score.findOneAndUpdate(
  //       { _id: ScoreId },
  //       { $pull: { comments: { _id: commentId } } },
  //       { new: true }
  //     );
  //   },
  // },
};

module.exports = resolvers;
