const express = require('express');
const { getUser } = require('../models/users.js');
const { compareHash } = require('../../lib/hashUtils');
const { sessionizeUser } = require('../helpers/utils.js');
const { COOKIE_NAME } = require('../../config.js');
const router = express.Router();

router.delete('/logout', ({ session }, res) => {
  const { user } = session;
  try {
    if (user) {
      session.destroy(() => {
        res.clearCookie(COOKIE_NAME);
        res.sendStatus(201);
      });
    } else {
      throw new Error("user doesn't exist");
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username);
    if (user && compareHash(password, user.password, user.salt)) {
      const sessionizedUser = sessionizeUser(user);
      req.session.user = sessionizedUser;
      console.log(req.sessionID);
      res.status(200).send(sessionizedUser);
    } else {
      throw new Error("passwords didn't match");
    }
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/loggedIn', ({ session: { user }}, res) => {
  res.status(200).send(user);
});

module.exports = router;
