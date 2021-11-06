const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: { 
    type: String,
  },
},
{timestamps: true},
);

const Activity = model('Activity', activitySchema);

module.exports = Activity;