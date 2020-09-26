const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    imgUrl: { type: String, required: true },
    nick: { type: String, required: true },
    job: { type: String, required: true },
    isAttendance: { type: Boolean }
  }
)

module.exports = mongoose.model('users', Users)