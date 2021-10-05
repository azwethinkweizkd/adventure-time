const db = require('../config/connection');
const { Profile, Activity } = require('../models');
const profileSeeds = require('./profileSeeds.json');

const activitiesData = require('./activitiesSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Activity.deleteMany({});

    await Profile.create(profileSeeds);

    const profile = await Profile.insertMany(profileSeeds);
    const activity = await Activity.insertMany(activitiesData);
    
    profile.push(activity);


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
