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

const podcastSchema = mongoose.Schema({
  author: String,
  author_lower: String,
  name: {
    type: String,
    unique: true,
  },
  name_lower: String,
  description: String,
  description_lower: String,
  feedUrl: String,
  art30: String,
  art60: String,
  art100: String,
  art600: String,
  genres: [String],
  episodes: [
    {
      title: String,
      pubDate: String,
      content: String,
      contentSnippet: String,
      audioLink: String,
      contentEncoded: String,
      contentEncodedSnippet: String,
    }
  ],
  reviews: [
    {
      username: String,
      body: String,
      rating: Number,
    }
  ],
});

const Podcast = mongoose.model('Podcast', podcastSchema);

const userSchema = mongoose.Schema({
  password: String,
  salt: String,
});

const Users = mongoose.model('User', userSchema);


module.exports = {
  Podcast,
  Users,
};