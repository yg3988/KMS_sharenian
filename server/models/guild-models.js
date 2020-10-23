const mongoose = require('mongoose');
const User = require('./user-models');
const Schema = mongoose.Schema;

UserSchema = mongoose.model('User').schema;

const GuildsSchema = new Schema(
  {
    world : { type: String, required: true },
    guild : { type: String, required: true },
    users : { type: [UserSchema] }
  },
  { versionKey: false }
)

module.exports = mongoose.model('Guild', GuildsSchema)