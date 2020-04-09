// Require Libraries
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express');

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');

require('./controllers/posts.js')(app);

require('./data/reddit-db');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


// Routes
app.get('/', (req, res) => {
  res.render('starter');
});

app.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

// require('./controllers/posts.js')(app);
//
// require('./data/reddit-db');



// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
