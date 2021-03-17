var mongoose = require('mongoose');
const url = process.env.CONNECTIONSTRING || 'mongodb://localhost:27017/podcats';
mongoose.connect(url, {
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

var Podcast = mongoose.model('Podcast', podcastSchema);

const selectAll = (cb) => {
  Podcast.find().select('name author description art600').limit(50).exec((err, podcasts) => {
    if (err) {
      cb(err);
    } else {
      cb(null, podcasts);
    }
  });
};

const searchByTerm = (searchTerm, cb) => {
  searchTerm = searchTerm.toLowerCase();
  const reg = new RegExp(searchTerm);
  Podcast.find({name_lower: reg}).then(podcasts => {
    cb(null, podcasts);
  }).catch(err => {
    cb(err);
  });
}

const findById = (id, cb) => {
  Podcast.findById(id).then(podcast => {
    cb(null, podcast);
  }).catch(err => {
    cb(err);
  });
}

const insertReview = (id, review, cb) => {
  Podcast.findById(id).then(podcast => {
    podcast.reviews.push(review);
    podcast.save().then(result => {
      cb(null, result);
    }).catch(err => {
      cb(err);
    })
  }).catch(err => {
      cb(err);
  });
}

module.exports = {
  selectAll,
  Podcast,
  searchByTerm,
  findById,
  insertReview,
}