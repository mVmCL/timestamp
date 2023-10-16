var express = require('express');
var app = express();
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function(req, res) {
  var date_string = req.params.date_string;
  var date;

  // If the date_string is empty, use the current date                                                                                                                                                                                                                                                                                                                           
  if (!date_string) {
    date = new Date();
  } else {
    // If the date_string is not empty, try to create a Date object with the date_string                                                                                                                                                                                                                                                                                         
    // Check if it's a unix timestamp                                                                                                                                                                                                                                                                                                                                            
    var timestamp = parseInt(date_string);
    if (!isNaN(timestamp)) {
      // It's a unix timestamp (in milliseconds)                                                                                                                                                                                                                                                                                                                                 
      date = new Date(timestamp);
    } else {
      // It's a string date                                                                                                                                                                                                                                                                                                                                                      
      date = new Date(date_string);
    }
  }

  // If the date is invalid, return an error                                                                                                                                                                                                                                                                                                                                     
  if (isNaN(date.getTime())) {
    res.json({ "error": "Invalid Date" });
  } else {
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  }
});

// listen for requests :)                                                                                                                                                                                                                                                                                                                                                        
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});                                                                                                                                                                                                                                                                                                                                                                              
