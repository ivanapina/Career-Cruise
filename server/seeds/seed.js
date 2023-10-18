const db = require('../config/connection');
const { Profile, Post } = require('../models');
const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');
const postData = require('./postData.json');

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles')
    await Profile.create(profileSeeds);
    await Post.create(postData);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
