const { Schema } = require('mongoose');

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;