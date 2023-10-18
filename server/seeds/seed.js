const db = require('../config/connection');
const { User, Post, Profile } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const postData = require('./postData.json');
const profileData = require('./profileData.json');

db.once('open', async () => {
    
    await cleanDB('User','users');
    await cleanDB('Post','posts');
    await cleanDB('Profile','profiles');
    await Profile.create(profileData);
    const profiles = await Profile.insertMany(profileData)
    const users = await User.insertMany(userData);
    const posts = await Post.insertMany(postData);
    
    for ( newUser of users ) {
        console.log('adding profile to user')
        const tempProfile = profiles[Math.floor(Math.random() * profiles.length)];
        newUser.profile = tempProfile;
        console.log(newUser)
        await newUser.save();
    }


    console.log('all done!');
    process.exit(0);
})