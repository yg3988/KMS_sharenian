const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    nick: { type: String, required: true },
    job: { type: String, required: true },
    isAttendance: { type: Boolean }
  },
  { versionKey: false }
)

module.exports = mongoose.model('User', UserSchema)