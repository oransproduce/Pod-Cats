var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/podcats', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var podcastSchema = mongoose.Schema({
  author: String,
  name: {
    type: String,
    unique: true,
  },
  description: String,
  feedUrl: String,
  art30: String,
  art60: String,
  art100: String,
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
  ]
});

var Podcast = mongoose.model('Podcast', podcastSchema);

var selectAll = function(callback) {
  Podcast.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports = {
  selectAll,
  Podcast,
}