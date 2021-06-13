const crypto = require('crypto');

const createHash = (data, salt = '') => {
  const hash = crypto.createHash('sha256');
  hash.update(data + salt);
  return hash.digest('hex');
};

const compareHash = (attempted, stored, salt) => stored === createHash(attempted, salt);

const createRandom32String = () => crypto.randomBytes(32).toString('hex');

module.exports = {
  createHash,
  compareHash,
  createRandom32String,
};
