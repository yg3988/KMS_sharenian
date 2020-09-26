const express = require('express');

const Controller = require('../controllers/controller');

const router = express.Router();

router.post(`/guild`, Controller.createGuild);
router.post(`/guilds`, Controller.getGuildByName);
router.post(`/user`, Controller.createUser);

module.exports = router;