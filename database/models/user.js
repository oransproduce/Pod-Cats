const mongoose = require('../index.js');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
