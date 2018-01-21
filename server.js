'use strict'
// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoints
app.get('/api/timestamp/:date_string', (req, res) => {
  res.send(validateTimestamp(req.params.date_string));
});

app.get('/api/timestamp/', (req, res) => {
  const nowUNIX = Date.now();
  const nowUTC = new Date(Date.now()).toUTCString();
  res.send({ unix: nowUNIX, utc: nowUTC });
});

app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

function validateTimestamp(timestamp) {  
  
  function makeUTC(input) {
    return new Date(input).toUTCString();
  }
  
  const result = {
    unix: null,
    utc: null
  };
  
  if (+timestamp >= 0) { //UNIX timestamp
    result.unix = +timestamp;
    result.utc = makeUTC(+timestamp);
  } else if (isNaN(+timestamp)) { //ISO date
    result.unix = Date.parse(timestamp);
    result.utc = makeUTC(timestamp);
  } else {
    return result;
  }
}


// listen for requests :)
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});