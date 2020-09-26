const axios = require('axios');
const cheerio = require('cheerio');
const User = require('../models/user-models');

const argvNick = process.argv.slice(2);

const searchMapleStoryCharacter = (nickname) => {
  let encodedCharacter = encodeURI(nickname);
  let url = "https://maplestory.nexon.com/Ranking/World/Total?c=" + encodedCharacter;
  let body;
  axios.get(url)
    .then(function (res) {
      let characterList;
      const $ = cheerio.load(res.data);
      const bodyList = $("table.rank_table").children("tbody");

      bodyList.each(function (i, element) {
        characterList = $(this)
          .find("tr.search_com_chk")
      });

      body = {
        "Guild": characterList[0].children[11].children[0].data,
        "ImgUrl": characterList[0].children[3].children[1].children[1].attribs.src,
        "Nick": characterList[0].children[3].children[3].children[1].children[0].children[1].data,
        "Job": characterList[0].children[3].children[3].children[3].children[0].data,
      }
      console.log(body)
    })
    .then(function (res) {
      const user = new User(body)

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
};

searchMapleStoryCharacter(argvNick);