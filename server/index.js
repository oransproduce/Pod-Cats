const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { selectAll, searchByTerm, findById } = require('../database');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/podcasts', (req, res) => {
  selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/podcasts/:id', (req, res) => {
  const { id } = req.params;
  findById(id, (err, podcast) => {
    console.log(podcast);
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(podcast);
    }
  });
});

app.get('/search/:searchTerm', (req, res) => {
  const { searchTerm } = req.params;
  searchByTerm(searchTerm, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

