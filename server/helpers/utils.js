module.exports = {
  sessionizeUser: (user) => ({
    username: user.username,
    _id: user._id,
  }),
}
