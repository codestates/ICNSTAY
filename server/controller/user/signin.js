const jwt = require('jsonwebtoken');
const user = require('../../models/user');

module.exports = async (req, res) => {
  res.status(200).json('signin');
}