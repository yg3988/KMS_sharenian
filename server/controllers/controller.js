const axios = require('axios');
const cheerio = require('cheerio');
const User = require('../models/user-models');
const Guild = require('../models/guild-models');
const { response } = require('express');


//Searching Guild in DB
getGuildByName = async (req, res) => {
  const arrWorlds = [
    "스카니아", "베라", "루나", "제니스", "크로아", "유니온", "엘리시움", "이노시스", "레드", "오로라", "아케인", "노바", "리부트", "리부트2"
  ]

  Guild.findOne({ world: arrWorlds[req.body.world], guild: req.body.guild }, (err, guild) => {
    if (err) {
      return res.status(400).json({ success: false, error: `띠로링` })
    }

    if (!guild) {
      return res.status(404).json({
        success: false, error: `Guild not found.`
      })
    }

    return res.status(200).json({ success: true, data: guild._id })
  }).catch(err => console.log(err))
}

getGuildById = async (req, res) => {
  Guild.findById(req.body.gid, (err, guild) => {
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

//Searching Guild In Korean MapleStory Official Homepage
getGuildInMaple = (req, res) => {
  /*
  스카니아 = 0
  베라 = 1
  루나 = 3
  제니스 = 4
  크로아 = 5
  유니온 = 10
  엘리시움 = 16
  이노시스 = 29
  레드 = 43
  오로라 = 44
  아케인 = 50
  노바 = 51
  리부트 = 45
  리부트2 = 46
  */

  const arrWorld = ["0", "1", "3", "4", "5", "10", "16", "29", "43", "44", "50", "51", "45", "46"]

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: `No any Data`,
    })
  }

  const world = body.world;
  const guild = encodeURI(body.guild);
  const url = "https://maplestory.nexon.com/Ranking/World/Guild?t=1&n=" + guild;

  return axios.get(url)
    .then(function (request, response) {
      if (!request.data) {
        return res.status(400).json({
          success: false,
          error: `No any Data`,
        })
      }

      const $ = cheerio.load(request.data);
      const bodyList = $("table.rank_table2").children("tbody").children("tr");

      return bodyList;
    })
    .then(list => {
      let guildURL;

      // (async () => {
      //   for (let element of list) {
      //     const params = element.children[3].children[1].children[1].attribs.href.split('=');

      //     if (params[2] === arrWorld[world]) {
      //       guildURL = { "gid": params[1].split('&')[0], "wid": params[2] }
      //     }
      //   }
      // })();

      list.each((i, element) => {
        const params = element.children[3].children[1].children[1].attribs.href.split('=');

        if (params[2] === arrWorld[world]) {
          guildURL = { "gid": params[1].split('&')[0], "wid": params[2] }
        }
      })

      return guildURL
    })
    .then(url => {
      return res.status(200).json({
        gid: url.gid,
        wid: url.wid
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Not Found Guild',
      })
    })
}

//Searching Guild in detail
getGuildInfo = (req, res) => {
  const body = req.body;
  const url = `https://maplestory.nexon.com/Common/Guild?gid=${body.gid}&wid=${body.wid}&orderby=1`

  return axios.get(url)
    .then((request, response) => {
      if (!request.data) {
        return res.status(400).json({
          success: false,
          error: `No any Data`,
        })
      }

      const $ = cheerio.load(request.data);

      const html = $("div.info_tb_wrap:nth-child(1)");

      const guildName = html[0].childNodes[1].childNodes[0].childNodes[1].data;
      const guildWorld = html[0].childNodes[3].childNodes[1].childNodes[1].data;

      return res.status(200).json({
        wid: body.wid,
        world: guildWorld,
        gid: body.gid,
        guild: guildName
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'guild body',
      })
    })
}

//Searching Guild's members in maple.gg(third party Web Site)
getGuildMembers = (req, res) => {
  const {wid, world, gid, guild} = req.body;

  const url = `https://maplestory.nexon.com/Common/Guild?gid=${gid}&wid=${wid}&orderby=1`

  let memberPageList = [];
  let memberList = [];

  return axios.get(url)
    .then(response => {
      //길드원 이름 수집
      const $ = cheerio.load(response.data);

      $("div.page_numb>a").each((index, element) => {
        memberPageList.push(`&page=${index + 1}`);
      })

      function getMember(URL) {
        return new Promise((resolve, reject) => {
          axios.get(URL)
            .then(res => {
              const $ = cheerio.load(res.data);
              const bodyList = $('table.rank_table').children('tbody').find('tr>td>dl');

              bodyList.each(function (i, element) {
                memberList.push(element.children[1].children[0].children[1].data)
              })
            })
            .then(() => {
              resolve();
            })
        })
      }


      return (async () => {
        for (let i = 0; i < memberPageList.length; i++) {
          await getMember(url + memberPageList[i])
        }
        return Promise.resolve(memberList);
      })();
    })
    .then(memberData => {
      //길드원 세부정보 
      let memberList = [];

      function getMember(URL) {
        return new Promise((resolve, rejcet) => {
          axios.get(URL)
            .then(response => {
              let moorueng;
              const $ = cheerio.load(response.data);
              const first = $("div.user-profile").find("section.container>div.row>div:nth-child(2)")[0];
              const second = $("div.card>div>section.container>div.text-center>div").find('h1');
              
              second.length ?
                moorueng = second[0].children[0].data.split('\n')[0] :
                moorueng = 0

              console.log(first.children[1].children[3].children[0].data);
              /*
              길드원
              name          : 닉네임
              job           : 직업
              lv            : 레벨
              moorueng      : 무릉
              isAttendance  : 참가여부
              */
              memberList.push(new User({
                "nick"        : first.children[1].children[3].children[0].data,
                "job"         : first.children[3].children[1].children[3].children[0].data,
                "lv"          : first.children[3].children[1].children[1].children[0].data.split(".")[1],
                "moorueng"    : moorueng,
                "isAttendance": false
              }))
            })
            .then(() => {
              resolve()
            })
        })
      }

      return (async () => {
        for (let i = 0; i < memberData.length; i++) {
          const encodedCharacter = encodeURI(memberData[i]);
          let url = "https://maple.gg/u/" + encodedCharacter;
          await getMember(url)
        }
        return Promise.resolve(memberList);
      })();
    })
    .then(result => {
      console.log(result)
      const schemaGuild = new Guild({
        world: world,
        guild: guild,
        users: result
      })

      schemaGuild
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            message: 'Guild created'
          })
        })
        .catch(err => {
          return res.status(400).json({
            err,
            message: 'Guild not created'
          })
        })
    })
}

module.exports = {
  getGuildByName,
  getGuildById,
  getGuildInMaple,
  getGuildInfo,
  getGuildMembers
}