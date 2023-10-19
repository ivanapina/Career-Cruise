const db = require('../config/connection');
const { Profile, Post } = require('../models');
const cleanDB = require('./cleanDB');
const profileSeeds = require('./profileSeeds.json');
const postData = require('./postData.json');

db.once('open', async () => {
  try {
    await cleanDB('Profile', 'profiles')
    await cleanDB('Post', 'posts')
    const profile = await Profile.create(profileSeeds);
    const posts = await Post.create(postData);

    for (newPost of posts) {
      newPost.createdBy.push(profile[0]._id); 
      await newPost.save();
    }
    
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
