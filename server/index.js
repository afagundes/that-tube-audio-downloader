const http = require('http');
const stream = require('youtube-audio-stream');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(async (req, res) => {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'audio/mpeg');
        for await (const chunk of stream(`https://www.youtube.com/watch?v=_5gyvZHwXSo`)) {
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
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
