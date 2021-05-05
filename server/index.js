const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const podcastController = require('./controllers/podcasts.js');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser({
//   secret: 'test',
// }));
app.use(
  session({
    storage: MongoStore.create({ mongoUrl: 'mongodb://localhost/sessions' }),
    secret: 'test',
  })
)

app.use(express.static(__dirname + '/../react-client/dist'));

app.use('/podcasts', podcastController);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

