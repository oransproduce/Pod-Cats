const express = require('express');
const { signup } = require('../models/users.js');
const { sessionizeUser } = require('../helpers/utils.js');

const router = express.Router();

router.post('', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  signup(user).then((user) => {
    const sessionizedUser = sessionizeUser(user);
    req.session.user = sessionizedUser;
    res.status(201).send(sessionizedUser);
  }).catch((err) => {
    res.sendStatus(500);
  });
});

module.exports = router;
