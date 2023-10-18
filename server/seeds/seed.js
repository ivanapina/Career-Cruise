const db = require('../config/connection');
const { User, Post, Profile } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const postData = require('./postData.json');
const profileData = require('./profileData.json');

db.once('open', async () => {
    
    //await cleanDB();
    //await cleanDB();
    //await cleanDB();
    await Profile.create(profileData);
    const profiles = await Profile.insertMany(profileData)
    const users = await User.insertMany(userData);
    const posts = await Post.insertMany(postData);
    
    for ( newUser of users ) {
        const tempProfile = profileData[Math.floor(Math.random() * profiles.length)];
        newUser.profile = tempProfile._id;
    }


    console.log('all done!');
    process.exit(0);
})