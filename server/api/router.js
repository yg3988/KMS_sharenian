const express = require('express');

const Controller = require('../controllers/controller');

const router = express.Router();

router.post(`/getguildbyname`, Controller.getGuildByName);
router.post(`/getguildbyid`, Controller.getGuildById);
router.post(`/searchguild`, Controller.getGuildInMaple);
router.post(`/getguildinfo`, Controller.getGuildInfo);
router.post(`/getguildmembers`, Controller.getGuildMembers);

module.exports = router;