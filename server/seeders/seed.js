const db = require('../config/connection');
const { Room } = require('../models');
const scoreSeeds = require('./scoreseeds.json');

db.once('open', async () => {
  await Room.deleteMany({});
 

  console.log('all done!');
  process.exit(0);
});
