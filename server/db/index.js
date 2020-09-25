const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/mapledb";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => {
    console.error('Connection error', e.message);
  })

const db = mongoose.connection;

module.exports = db;