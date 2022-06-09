const express = require('express');
const bodyParser = require('body-parser');
const stream = require('youtube-audio-stream');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/download', async (req, res) => {
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
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server listening at ${PORT}`))
