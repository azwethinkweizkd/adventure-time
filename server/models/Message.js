const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  message: String,
  senderName: String,
  receiverName: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
