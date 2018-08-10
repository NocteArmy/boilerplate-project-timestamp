// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Following section was completed by Bradley Burrows

// API endpoint for timestamps
// Check if the Date String is left empty
app.get("/api/timestamp", (req, res) => {
  let today = new Date(Date.now());
  let dateObj = { "unix": today.getTime(), "utc": today.toUTCString() };
  res.json(dateObj);
});

// Check if Date String is included and check if it is a Number or String
app.get("/api/timestamp/:dateStr", (req, res) => {
  
  if(!req.params.dateStr) {
    let today = Date.now();
    let dateObj = { "unix": today.getTime(), "utc": today.toUTCString() };
    res.json(dateObj);
  } else if(!isNaN(+req.params.dateStr)) {
    let d = new Date(+req.params.dateStr);
    let dateObj = { "unix": d.getTime(), "utc": d.toUTCString() };
    res.json(dateObj);
  } else {
    let d = new Date(req.params.dateStr);
    let dateObj = { "unix": d.getTime(), "utc": d.toUTCString() };
    res.json(dateObj);
  }
  
});

// End of user completed section

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});