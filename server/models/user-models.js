const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    Guild: { type: String, required: true },
    ImgUrl: { type: String, required: true },
    Nick: { type: String, required: true },
    Job: { type: String, required: true },
  }
)

module.exports = mongoose.model('users', Users)