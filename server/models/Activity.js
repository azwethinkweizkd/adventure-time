const { Schema } = require('mongoose');

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

module.exports = activitySchema;