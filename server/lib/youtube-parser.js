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
    
    let nextVideo = matches[matches.length - 2];
    nextVideo = nextVideo?.replaceAll("\"", "")?.replaceAll("url:", "");

    return nextVideo;
}

function parseYoutube(youtubeHtml) {
    const title = extractPattern(youtubeHtml, titlePattern, 1);
    const description = extractPattern(youtubeHtml, descriptionPattern, 1);
    const nextVideo = extractNextVideo(youtubeHtml);

    return {
        title,
        description,
        nextVideo
    }
}

module.exports = parseYoutube;
