var mongoose = require('mongoose');
const url = process.env.CONNECTIONSTRING || 'mongodb://localhost:27017/podcats';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

module.exports = mongoose;
