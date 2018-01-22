'use strict'
// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const validator = require('./validator');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// API endpoints
app.get('/api/timestamp/:date_string', (req, res) => {
    res.send(validator(req.params.date_string));
});

app.get('/api/timestamp/', (req, res) => {
    const nowUNIX = Date.now();
    const nowUTC = new Date(Date.now()).toUTCString();
    res.send({ unix: nowUNIX, utc: nowUTC });
});

app.get("/api/hello", (req, res) => {
    res.json({ greeting: 'hello API' });
});


// listen for requests :)
app.listen(PORT, () => {
    console.log('Your app is listening on port ' + PORT);
});