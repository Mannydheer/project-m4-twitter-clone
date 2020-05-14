const path = require('path');
const express = require('express');
const cors = require('cors');


const port = process.env.PORT || 31415;


var app = express();

app.use(express.json());
app.use(cors())

app.use(require('./routes/profile'));
app.use(require('./routes/tweet'));
app.use(require('./routes/feed'));


app.use('/', express.static(__dirname + '/'))

// app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});

