const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = {
  get: (req, res) => {
    res.status(200).json('userInfo get');
  },
  post: (req, res) => {
    res.status(200).json('userInfo post');
  },
  delete: async (req, res) => {
    if ( req.cookies.accessToken ) {
      const tokenDecoer = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
      const { iat, exp, ...userInfo } = tokenDecoer;
      await user.destroy({
        where: userInfo
      });
      res.status(200).json({ message: "successfully deleted" })
    }else {
      res.status(401).json({ message: 'invalid access token'})
    }
  }
}