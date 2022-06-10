const express = require('express');
const { streamVideo, fetchYoutube } = require('../controller/youtube-controller');
const youtubeRouter = express.Router();

youtubeRouter.get('/download', streamVideo);
youtubeRouter.get('/fetch-data', fetchYoutube);

module.exports = youtubeRouter;
