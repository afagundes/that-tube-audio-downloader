const titlePattern = /<meta name="title" content="(.*?)">/;
const descriptionPattern = /<meta name="description" content="(.*?)">/;

function extractPattern(data, pattern, index) {
    if (!pattern.test(data)) {
        return null;
    }
    
    const matches = data.match(pattern);
    return matches[index];
}

function extractNextVideo(data) {
    const pattern = /"url":"(\/watch\?v=.*?)"/g;

    if (!pattern.test(data)) {
        return null;
    }
    
    const matches = data.match(pattern);
    const randomIndex = Math.round(Math.random() * (matches.length - 1));

    let nextVideo = matches[randomIndex];
    nextVideo = nextVideo?.replaceAll("\"", "")?.replaceAll("url:", "");

    return nextVideo;
}

function parseYoutube(youtubeHtml) {
    const title = extractPattern(youtubeHtml, titlePattern, 1);
    const description = extractPattern(youtubeHtml, descriptionPattern, 1);
    
    let nextVideo = extractNextVideo(youtubeHtml);

    if (nextVideo) {
        nextVideo = `https://www.youtube.com${nextVideo}`;
    }

    return {
        title,
        description,
        nextVideo
    }
}

module.exports = parseYoutube;
