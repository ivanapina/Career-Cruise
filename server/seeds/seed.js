const db = require('../config/connection');
const { User, Post, Profile } = require('../models');
//const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const postData = require('./postData.json');
const profileData = require('./profileData.json');

db.once('open', async () => {
    /*
    await cleanDB();
    await cleanDB();
    await cleanDB();
    */

    const users = await User.insertMany(userData);
    const post = await Post.insertMany(postData);
    const profiles = await Profile.insertMany(profileData);


    console.log('all done!');
    process.exit(0);
})