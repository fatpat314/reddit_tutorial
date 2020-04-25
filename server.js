// Require Libraries
require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');
//
// var cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');

// const app = express();

app.use(cookieParser()); // Add this after you initialize express.




app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


// Routes
// app.get('/', (req, res) => {
//   res.render('posts-index');
// });
//
// app.get('/posts/new', (req, res) => {
//     res.render('posts-new');
// });

// require('./controllers/posts.js')(app);
//
require('./data/reddit-db');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


module.exports = app;



// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
