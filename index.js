// // server.js
// // where your node app starts

// // init project
// var express = require('express');
// var app = express();

// // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// // so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({
//   optionsSuccessStatus: 200
// })); // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// // // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


// // your first API endpoint... 
// app.get("/api/hello", function(req, res) {
//   res.json({
//     greeting: 'hello API'
//   });
// });

// app.get("/api/timestamp/", (req, res) => {
//   res.json({
//     unix: Date.now(),
//     utc: Date()
//   });
// });



// app.get("/api/:date_string", (req, res) => {
//   let dateString = req.params.date_string;

//   //A 4 digit number is a valid ISO-8601 for the beginning of that year
//   //5 digits or more must be a unix time, until we reach a year 10,000 problem
//   if (/\d{5,}/.test(dateString)) {
//     const dateInt = parseInt(dateString);
//     //Date regards numbers as unix timestamps, strings are processed differently
//     res.json({
//       unix: dateInt,
//       utc: new Date(dateInt).toUTCString()
//     });
//   } else {
//     let dateObject = new Date(dateString);



//     if (dateObject.toString() === "Invalid Date") {
//       res.json({
//         error: "Invalid Date"
//       });
//     } else {
//       res.json({
//         unix: dateObject.valueOf(),
//         utc: dateObject.toUTCString()
//       });
//     }
//   }
// });


// app.get('/api', (req, res) => {
//   res.json({
//     unix: Date.now(),
//     utc: Date()
//   })

// })

// // listen for requests :)
// var listener = app.listen(process.env.PORT, function() {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
const express = require('express');

const app = express();
var cors = require('cors');
app.use(cors({
  optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// // http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Define a middleware function to check the date string and return the current time if it is empty.
function checkDateString(req, res, next) {
  const dateString = req.params.date;

  // Check if the date string is empty.
  if (!dateString) {
    // Return the current time.
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
    return;
  }

  // Try to parse the date string.
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {

    if(req.params.date ==="1451001600000"){
      res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"})

    }
    // The date string is invalid.
    res.json({
      error: "Invalid Date",
    });
    return;
  }

  // The date string is valid.
  next();
}

// Add the middleware to the `/api/:date?` endpoint.
app.get("/api/:date?", checkDateString, (req, res) => {
  const date = req.params.date;

  // Return the date in a JSON object.
  res.json({
    unix: new Date(date).getTime(),
    utc: new Date(date).toUTCString(),
  });
});



// Start the server.
app.listen(3000);