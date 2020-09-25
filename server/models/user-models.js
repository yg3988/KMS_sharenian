const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    charGuild: { type: String, required: true, uniqu: true },
    charImgUrl: { type: String, required: true },
    charNick: { type: String, required: true },
    charJob: { type: String, required: true },
  }
)

module.exports = mongoose.model('users', Users)