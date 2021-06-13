const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const podcastController = require('./controllers/podcasts.js');
const userController = require('./controllers/users.js');
const authController = require('./controllers/auth.js');

const { PORT, SESS_SECRET, COOKIE_NAME } = require('../config.js');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    name: COOKIE_NAME,
    storage: MongoStore.create({ mongoUrl: 'mongodb://localhost/sessions' }),
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/podcasts', podcastController);
app.use('/users', userController);
app.use('/auth', authController);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'react-client', 'dist', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
