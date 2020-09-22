const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    charImgUrl: { type: String, required: true },
    charNick: { type: String, required: true },
    charJob: { type: String, required: true },
    charGuild: { type: String, required: true },
  }
)

module.exports = mongoose.model('users', Users)