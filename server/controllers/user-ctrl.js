const User = require('../models/user-models');

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Failed to search Character',
    })
  }

  const user = new User(body)

  if (!user) {
    return res.status(400).json({
      success: false,
      error: err
    })
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'Character Added',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Failed to add Character'
      })
    })
}

module.exports = {
  createUser
}