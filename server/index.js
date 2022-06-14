const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const youtubeRouter = require('./router/youtube-router');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", youtubeRouter);

app.listen(PORT, HOST, () => console.log(`Server listening at ${PORT}`))
