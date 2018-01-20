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
app.get('/api/timestamp/:date?', (req, res) => {
  const unix = req.query.unix;
  const utc = req.query.utc;
  res.send(validateTimestamp(unix, utc));
});

app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

//REFACTOR WITH ONE PARAMETER
function validateTimestamp(a, b) {
  const result = {
    unix: null,
    utc: null
  };
  const nowUNIX = Date.now();
  const nowUTC = new Date(Date.now()).toUTCString();
  // const toUTC = new Date(input).getTime();
  
  if (!a && !b) {
    result.unix = nowUNIX;
    result.utc = nowUTC;
  } else if (+a != NaN) {
    result.unix = a;
    result.utc = (new Date(a)).toUTCString();
  }
    
  return result;
}


// listen for requests :)
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});