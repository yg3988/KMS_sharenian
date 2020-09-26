const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Guilds = new Schema(
  {
    world: { type: String, required: true },
    guild: { type: String, required: true },
    user: [{
      imgUrl: { type: String, required: true },
      nick: { type: String, required: true },
      job: { type: String, required: true },
      isAttendance: { type: Boolean }
    }]
  }
)

module.exports = mongoose.model('guilds', Guilds)