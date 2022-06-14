const { decode } = require('html-entities');

const titlePattern = /<meta name="title" content="(.*?)">/;
const descriptionPattern = /<meta name="description" content="(.*?)">/;

function extractPattern(data, pattern, index) {
    if (!pattern.test(data)) {
        return null;
    }

    const matches = data.match(pattern);
    return matches[index];
}

function extractNextVideo(data, youtubeUrl) {
    const pattern = /"url":"(\/watch\?v=.*?)"/g;
    if (!pattern.test(data)) return null;

    const matches = data.match(pattern);
    const maxTries = 10;
    let currentTry = 0;
    let randomVideo = null;

    while (currentTry <= maxTries) {
        randomVideo = getRandomVideo(matches);

        if (!randomVideo) break;

        if (randomVideo.includes("\\u0026") || youtubeUrl === randomVideo) {
            currentTry++;
            continue;
        }

        break;
    }

    return randomVideo;
}

function getRandomVideo(videos) {
    const randomIndex = Math.round(Math.random() * (videos.length - 1));
    let nextVideo = videos[randomIndex];

    if (nextVideo) {
        nextVideo = nextVideo.replaceAll("\"", "").replaceAll("url:", "")
        nextVideo = `https://www.youtube.com${nextVideo}`;
    }

    return nextVideo;
}

function parseYoutube(youtubeHtml, youtubeUrl) {
    const title = decode(extractPattern(youtubeHtml, titlePattern, 1));
    const description = decode(extractPattern(youtubeHtml, descriptionPattern, 1));

    let nextVideo = extractNextVideo(youtubeHtml, youtubeUrl);

    return {
        title,
        description,
        nextVideo
    }
}

module.exports = parseYoutube;
