const stream = require('youtube-audio-stream');
const fetch = require('node-fetch');
const parseYoutube = require('../lib/youtube-parser');

const streamVideo = async (req, res) => {
    const { videoUrl } = req.query;

    try {
        res.statusCode = 200;
        res.setHeader('Content-Disposition', 'attachment; filename=audio.mp3');
        res.setHeader('Content-Type', 'audio/mpeg');

        for await (const chunk of stream(videoUrl)) {
            res.write(chunk);
        }

        res.end();
    }
    catch (err) {
        console.error(err);

        if (!res.headersSent) {
            res.writeHead(500);
            res.end('internal server error');
        }
    }
}

const fetchYoutube = async (req, res) => {
    try {
        const { videoUrl } = req.query;

        const youtubeRes = await fetch(videoUrl);
        const html = await youtubeRes.text();

        res.json(parseYoutube(html));
    }
    catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end('internal server error');
    }
}

module.exports = {
    streamVideo,
    fetchYoutube
};