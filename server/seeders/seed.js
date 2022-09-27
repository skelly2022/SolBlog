const db = require('../config/connection');
const { Score } = require('../models');
const scoreSeeds = require('./scoreseeds.json');

db.once('open', async () => {
  await Score.deleteMany({});
  await Score.create(scoreSeeds);

  console.log('all done!');
  process.exit(0);
});
