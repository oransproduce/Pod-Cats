const mongoose = require('../index.js');

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

module.exports = Podcast;
