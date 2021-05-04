const { Podcast }  = require('../../database');

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
  searchByTerm,
  findById,
  insertReview,
};