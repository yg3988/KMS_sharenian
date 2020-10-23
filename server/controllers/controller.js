const axios = require('axios');
const cheerio = require('cheerio');
const User = require('../models/user-models');
const Guild = require('../models/guild-models');
const { response } = require('express');

//Searching Guild in DB
getGuildByName = async (req, res) => {
	const arrWorlds = [
		'스카니아',
		'베라',
		'루나',
		'제니스',
		'크로아',
		'유니온',
		'엘리시움',
		'이노시스',
		'레드',
		'오로라',
		'아케인',
		'노바',
		'리부트',
		'리부트2',
	];

	Guild.findOne(
		{ world: arrWorlds[req.body.world], guild: req.body.guild },
		(err, guild) => {
			if (err) {
				return res.status(400).json({ success: false, error: `띠로링` });
			}

			if (!guild) {
				return res.status(404).json({
					success: false,
					error: `Guild not found.`,
				});
			}

			return res.status(200).json({ success: true, data: guild._id });
		}
	).catch((err) => console.log(err));
};

getGuildById = async (req, res) => {
	Guild.findById(req.body.gid, (err, guild) => {
		if (err) {
			return res.status(400).json({ success: false, error: `띠로링` });
		}

		if (!guild) {
			return res.status(404).json({
				success: false,
				error: `Guild not found.`,
			});
		}

		return res.status(200).json({ success: true, data: guild });
	}).catch((err) => console.log(err));
};

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

	const arrWorld = [
		'0',
		'1',
		'3',
		'4',
		'5',
		'10',
		'16',
		'29',
		'43',
		'44',
		'50',
		'51',
		'45',
		'46',
	];

	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: `No any Data`,
		});
	}

	const world = body.world;
	const guild = encodeURI(body.guild);
	const url = 'https://maplestory.nexon.com/Ranking/World/Guild?t=1&n=' + guild;

	return axios
		.get(url)
		.then(function (request, response) {
			if (!request.data) {
				return res.status(400).json({
					success: false,
					error: `No any Data`,
				});
			}

			const $ = cheerio.load(request.data);
			const bodyList = $('table.rank_table2').children('tbody').children('tr');

			return bodyList;
		})
		.then((list) => {
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
				const params = element.children[3].children[1].children[1].attribs.href.split(
					'='
				);

				if (params[2] === arrWorld[world]) {
					guildURL = { gid: params[1].split('&')[0], wid: params[2] };
				}
			});

			return guildURL;
		})
		.then((url) => {
			return res.status(200).json({
				gid: url.gid,
				wid: url.wid,
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'Not Found Guild',
			});
		});
};

//Searching Guild in detail
getGuildInfo = (req, res) => {
	const body = req.body;
	const url = `https://maplestory.nexon.com/Common/Guild?gid=${body.gid}&wid=${body.wid}&orderby=1`;

	return axios
		.get(url)
		.then((request, response) => {
			if (!request.data) {
				return res.status(400).json({
					success: false,
					error: `No any Data`,
				});
			}

			const $ = cheerio.load(request.data);

			const html = $('div.info_tb_wrap:nth-child(1)');

			const guildName = html[0].childNodes[1].childNodes[0].childNodes[1].data;
			const guildWorld = html[0].childNodes[3].childNodes[1].childNodes[1].data;

			return res.status(200).json({
				wid: body.wid,
				world: guildWorld,
				gid: body.gid,
				guild: guildName,
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'guild body',
			});
		});
};

//Searching Guild's members in maple.gg(third party Web Site)
getGuildMembers = (req, res) => {
	const { wid, world, gid, guild } = req.body;

	const url = `https://maplestory.nexon.com/Common/Guild?gid=${gid}&wid=${wid}&orderby=1`;

	let memberPageList = [];
	let memberList = [];

	return axios
		.get(url)
		.then((response) => {
			//길드원 이름 수집
			const $ = cheerio.load(response.data);

			$('div.page_numb>a').each((index, element) => {
				memberPageList.push(`&page=${index + 1}`);
			});

			function getMember(URL) {
				return new Promise((resolve, reject) => {
					axios
						.get(URL)
						.then((res) => {
							const $ = cheerio.load(res.data);
							const bodyList = $('table.rank_table')
								.children('tbody')
								.find('tr>td>dl');

							bodyList.each(function (i, element) {
								memberList.push(
									element.children[1].children[0].children[1].data
								);
							});
						})
						.then(() => {
							resolve();
						});
				});
			}

			return (async () => {
				for (let i = 0; i < memberPageList.length; i++) {
					await getMember(url + memberPageList[i]);
				}
				return Promise.resolve(memberList);
			})();
		})
		.then((memberData) => {
			//길드원 세부정보
			let memberList = [];

			function getMember(URL) {
				return new Promise((resolve, rejcet) => {
					axios
						.get(URL)
						.then((response) => {
							let moorueng;
							const $ = cheerio.load(response.data);
							const first = $('div.user-profile').find(
								'section.container>div.row>div:nth-child(2)'
							)[0];
							const second = $(
								'div.card>div>section.container>div.text-center>div'
							).find('h1');

							second.length
								? (moorueng = second[0].children[0].data.split('\n')[0])
								: (moorueng = 0);

							/*
              길드원
              name          : 닉네임
              job           : 직업
              lv            : 레벨
              moorueng      : 무릉
              isAttendance  : 참가여부
              */
							memberList.push(
								new User({
									nick: first.children[1].children[3].children[0].data,
									job:
										first.children[3].children[1].children[3].children[0].data,
									lv: first.children[3].children[1].children[1].children[0].data.split(
										'.'
									)[1],
									moorueng: moorueng,
									isAttendance: false,
								})
							);
						})
						.then(() => {
							resolve();
						});
				});
			}

			return (async () => {
				for (let i = 0; i < memberData.length; i++) {
					const encodedCharacter = encodeURI(memberData[i]);
					let url = 'https://maple.gg/u/' + encodedCharacter;
					await getMember(url);
				}
				return Promise.resolve(memberList);
			})();
		})
		.then((result) => {
			const schemaGuild = new Guild({
				world: world,
				guild: guild,
				users: result,
			});

			schemaGuild
				.save()
				.then(() => {
					return res.status(201).json({
						success: true,
						message: 'Guild created',
					});
				})
				.catch((err) => {
					return res.status(400).json({
						err,
						message: 'Guild not created',
					});
				});
		});
};

getMembersOfSharenian = async (req, res) => {
	const sourceUsers = req.body;
	let totLanes;
	let arr120sUser = new Array();
	let arr200sUser = new Array();
	let sharenian = new Array();
	let arrBuff = {
		flame: new Array(),
		battle: new Array(),
		wild: new Array(),
		mecha: new Array(),
		eunwol: new Array(),
		zero: new Array(),
	};
	let arrBishop = new Array();

	totLanes = parseInt(sourceUsers.length / 18);

	const divideUsers = (user) => {
		//000s
		if (
			user.job === '비숍' ||
			user.job === '플레임위자드' ||
			user.job === '배틀메이지' ||
			user.job === '와일드헌터' ||
			user.job === '메카닉' ||
			user.job === '은월' ||
			user.job === '제로'
		) {
			user.job === '비숍'
				? arrBishop.push(user)
				: user.job === '플레임위자드'
				? arrBuff.flame.push(user)
				: user.job === '배틀메이지'
				? arrBuff.battle.push(user)
				: user.job === '와일드헌터'
				? arrBuff.wild.push(user)
				: user.job === '메카닉'
				? arrBuff.mecha.push(user)
				: user.job === '은월'
				? arrBuff.eunwol.push(user)
				: arrBuff.zero.push(user);
		}
		//120s
		else if (
			user.job !== '팔라딘' &&
			user.job !== '다크나이트' &&
			user.job !== '나이트로드' &&
			user.job !== '섀도어' &&
			user.job !== '듀얼블레이더' &&
			user.job !== '바이퍼' &&
			user.job !== '캡틴' &&
			user.job !== '소울마스터' &&
			user.job !== '미하일' &&
			user.job !== '나이트워커' &&
			user.job !== '제논' &&
			user.job !== '에반' &&
			user.job !== '루미너스' &&
			user.job !== '메르세데스' &&
			user.job !== '팬텀' &&
			user.job !== '아델' &&
			user.job !== '일리움'
		) {
			arr120sUser.push(user);
		}
		//200s
		else {
			arr200sUser.push(user);
		}
	};

	for (let i = 0; i < sourceUsers.length; i++) {
		await divideUsers(sourceUsers[i]);
	}

	const avgStage = async (users) => {
		let tot = 0;
		let num = 0;

		for (let i = users.length - 1; i >= users.length - 15; i--) {
			if (!users[i]) break;
			tot += users[i].moorueng;
			num++;
		}

		return parseInt(tot / num);
	};

	const makeParty = async (users, avg, is200s) => {
		const isState = new Object();
		const arrSynergy = new Object();
		const buffers = new Array('flame', 'battle', 'wild', 'eunwol', 'zero');
		const lane = new Array();

		if (is200s) buffers.push('mecha');

		const assignBuffer = () => {
			for (let i = 0; i < buffers.length; i++) {
				if (arrBuff[buffers[i]].length) {
					let user = arrBuff[buffers[i]].pop();
					if (avg - 4 > user.moorueng) arrBuff[buffers[i]].push(user);
					else {
						arrSynergy[buffers[i]] = user;
						isState[buffers[i]] = false;
					}
				}
			}
		};

		await assignBuffer();

		const maxValueInArrSynergy = () => {
			let maxMooreung = 0;
			let character;
			for (const [key, value] of Object.entries(arrSynergy)) {
				if (maxMooreung < value.moorueng) {
					maxMooreung = value.moorueng;
					character = key;
				}
			}
			return character;
		};

		const reassignInLane = async () => {
			const changeMembers = (party) => {
				for (let i = party.length - 1; i > -1; i--) {
					if (!Object.keys(isState).length) break;
					if (
						!(
							party[i].job === '비숍' ||
							party[i].job === '플레임위자드' ||
							party[i].job === '배틀메이지' ||
							party[i].job === '와일드헌터' ||
							party[i].job === '메카닉' ||
							party[i].job === '은월' ||
							party[i].job === '제로'
						)
					) {
						const temp = Object.keys(isState).pop();

						users.push(party[i]);
						party[i] = arrSynergy[temp];

						delete isState[temp];
						delete arrSynergy[temp];
					}
				}
				return party;
			};

			for (let i = lane.length - 1; i > -1; i--) {
				const tempArr = lane[i];
				delete lane[i];
				const party = await changeMembers(tempArr);
				lane[i] = party;
				if (!Object.keys(isState).length) break;
			}
		};

		for (let i = 0; i < 3; i++) {
			const party = new Array();
			const bishop = arrBishop.pop();
			const isBishop = !bishop ? false : true;
			const end = isBishop ? 5 : 6;

			for (let j = 0; j < end; j++) {
				const user = users.pop();
				if (!user) break;
				const synergy = maxValueInArrSynergy();
				if (synergy && user.moorueng < arrSynergy[synergy].moorueng) {
					users.push(user);
					party.push(arrSynergy[synergy]);
					delete arrSynergy[synergy];
					delete isState[synergy];
				} else {
					party.push(user);
				}
			}
			if (isBishop) party.push(bishop);
			lane.push(party);
		}

		if (Object.keys(isState).length) await reassignInLane();

		sharenian.push(lane);
	};

	for (let i = 0; i < totLanes; i++) {
		const sec120 = await avgStage(arr120sUser);
		const sec200 = await avgStage(arr200sUser);

		sec120 > sec200
			? await makeParty(arr120sUser, sec120, false)
			: await makeParty(arr200sUser, sec200, true);
	}

	const returnSharenian = () => {
		return res.status(200).json(sharenian);
	};

	await returnSharenian();
};

module.exports = {
	getGuildByName,
	getGuildById,
	getGuildInMaple,
	getGuildInfo,
	getGuildMembers,
	getMembersOfSharenian,
};
