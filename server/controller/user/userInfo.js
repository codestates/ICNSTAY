const jwt = require('jsonwebtoken');
const { user } = require('../../models')

module.exports = {
  get: async ( req, res ) => {
    if ( req.cookies.accessToken ) {
      const { id } = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET)
      const userFinder = await user.findOne({
        where: { id }
      })
      if ( !userFinder ) {
        res.status(404).json({ message: 'email not exist', data: null })
      }else {
        const { password, createdAt, updatedAt, ...userInfo } = userFinder.dataValues;
        res.status(200).json(userInfo);
      }
    } else {
      res.status(401).json({ message: 'invaild access token' })
    }
  },
  post: ( req, res ) => {
    res.status(200).json('userInfo post');
  },
  delete: ( req, res ) => {
    res.status(200).json('userInfo delete');
  }
}