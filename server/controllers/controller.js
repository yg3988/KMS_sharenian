const axios = require('axios');
const cheerio = require('cheerio');
const User = require('../models/user-models');
const Guild = require('../models/guild-models');

getGuildByName = (req, res) => {
  Guild.findOneAndUpdate({ world: req.body.world, guild: req.body.guild }, { world: req.body.world, guild: req.body.guild }, { upsert: true }, (err, guild) => {
    //Guild.findOne({ world: req.body.world, guild: req.body.guild }, (err, guild) => {
    if (err) {
      return res.status(400).json({ success: false, error: `띠로링` })
    }

    if (!guild) {
      return res.status(404).json({
        success: false, error: `Guild not found.`
      })
    }

    return res.status(200).json({ success: true, data: guild })
  }).catch(err => console.log(err))
}

createGuild = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: `You must provide a guild's name`,
    })
  }

  const guild = new Guild(body)

  if (!guild) {
    return res.status(400).json({ success: false, error: err })
  }

  guild
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: guild._id,
        message: 'Guild created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Guild not created!',
      })
    })
}

getGuild = async (req, res) => {
  await Guild
    .find({}, (err, guilds) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!guilds) {
        return res.status(404).json({ success: false, error: 'Guild not found' })
      }
      return res.status(200).json({ success: true, data: guilds })
    })
    .catch(err => console.log(err));
}

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Failed to search Character',
    })
  }

  let encodedCharacter = encodeURI(body['name']);
  let url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + encodedCharacter;

  axios.get(url)
    .then(function (res) {
      let characterList;
      const $ = cheerio.load(res.data);
      const bodyList = $("table.rank_table").children("tbody");

      bodyList.each(function (i, element) {
        characterList = $(this)
          .find("tr.search_com_chk")
      });

      const model = {
        "ImgUrl": characterList[0].children[3].children[1].children[1].attribs.src,
        "Nick": characterList[0].children[3].children[3].children[1].children[0].children[1].data,
        "Job": characterList[0].children[3].children[3].children[3].children[0].data,
      }
      return model
    })
    .then((model) => {
      const user = new User(model)
      console.log("User-models:")
      console.log(user)

      if (!user) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }

      user
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: user._id,
            message: 'Character Added',
          })
        })
        .catch(error => {
          return res.status(400).json({
            error,
            message: 'Failed to add Character'
          })
        })
    })
    .catch(e => {
      console.error(e)
    })
}

module.exports = {
  getGuildByName,
  createGuild,
  getGuild,
  createUser
}