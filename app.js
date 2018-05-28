// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const router = express.Router();
// const authentication = require('./routes/auth')(router);
// const bodyparser = require('body-parser');
// const cors = require('cors');

/* ===================
   Import Node Modules
=================== */
//const env = require('./env');
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
const path = require('path'); // NodeJS Package for file paths
const authentication = require('./routes/auth'); // Import Authentication Routes
const blog = require('./routes/blog');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || 3000; // Allows heroku to set port

mongoose.Promise = global.Promise;
const db = "mongodb://developer:developer@ds137207.mlab.com:37207/videoplayer";

mongoose.connect(db,function(err){
    if(err){
        console.error('custom error' + err);
    }
});

var originsWhiteList = ['http://localhost:4200'];
var corOptions = {
  origin: function(origin, callback){
      var isWhitelisted=originsWhiteList.indexOf(origin)!== -1;
      callback(null, isWhitelisted);
  },
    credentials: true
}

// Middleware
app.use(cors(corOptions)); // Allows cross origin in development only
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
//app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
app.use(express.static(__dirname + '/public/'));
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/blogs', blog);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port !' + port);
});
