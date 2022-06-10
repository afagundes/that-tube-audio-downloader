const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const youtubeRouter = require('./router/youtube-router');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", youtubeRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server listening at ${PORT}`))
