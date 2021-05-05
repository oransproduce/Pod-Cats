const crypto = require('crypto');

module.exports = {
  compareHash: (attempted, stored, salt) => {
    return stored === createHash(attempted, salt);
  },
  createHash: (data, salt = '') => {
    const hash = crypto.createHash('sha256');
    hash.update(data + salt);
    return hash.digest('hex');
  },
  createRandom32String: () => {
    return crypto.randomBytes(32).toString('hex');
  },
}