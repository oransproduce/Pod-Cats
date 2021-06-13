const { User } = require('../../database/models');
const { createHash, createRandom32String } = require('../../lib/hashUtils.js');

module.exports = {
  signup: async (user) => {
    const { username, password } = user;
    const salt = createRandom32String();
    const hashedPassword = createHash(password, salt);
    const newUser = {
      username,
      password: hashedPassword,
      salt,
    };
    return User.create(newUser);
  },
  getUser: async (username) => User.findOne({ username }),
};
