const db = require('../config/connection');
const { Room,Score } = require('../models');
const scoreSeeds = require('./scoreseeds.json');

db.once('open', async () => {
  await Room.deleteMany({});
  await Score.deleteMany({});
 

  console.log('all done!');
  process.exit(0);
});
