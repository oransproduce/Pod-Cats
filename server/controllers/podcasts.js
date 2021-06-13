const express = require('express');
const { selectAll, findById, insertReview, searchByTerm } = require('../models/podcasts.js');

const router = express.Router();

router.get('/', (req, res) => {
  selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  findById(id, (err, podcast) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(podcast);
    }
  });
});

router.get('/search/:searchTerm', (req, res) => {
  const { searchTerm } = req.params;
  searchByTerm(searchTerm, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post('/:id/review', (req, res) => {
  const { id } = req.params;
  insertReview(id, req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;



