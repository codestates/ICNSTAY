const jwt = require('jsonwebtoken');
const { user } = require('../../models')

module.exports = {
  get: async ( req, res ) => {
    if ( req.cookies.accessToken ) {
      const tokenDecoder = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET)
      const { createdAt, updatedAt, iat, exp, ...userInfo} = tokenDecoder;
      const userFinder = await user.findOne({
        where: { id : userInfo.id }
      })
      if ( !userFinder ) {
        res.status(404).json({ message: 'email not exist', data: null })
      }else {
        res.status(200).json(userInfo);
      }
    } else {
      res.status(401).json({ message: 'invaild access token' })
    }
  },

  post: async (req, res) => {
    if( req.body.password || req.body.mobile || req.body.username ) {
      const tokenDecoder = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
      const { id } = tokenDecoder;
      if ( req.body.password ) {
        const { password } = req.body;
        await user.update({ password }, {
          where: { id }
        });
      }if ( req.body.mobile ) {
        const { mobile } = req.body;
        await user.update({ mobile }, {
          where: { id }
        });
      }if ( req.body. username ) {
        const { username } = req.body;
        await user.update({ username }, {
          where: { id }
        })
      }
      const userFinder = await user.findOne({
        where: { id }
      })
      const { password, createdAt, updatedAt, ...userInfo } = userFinder.dataValues
      res.clearCookie('accessToken');
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: '6h'
      })
      res.cookie('accessToken', accessToken, { sameSite: 'None', secure: true, httpOnly: true});
      res.status(200).json(userInfo);
    }else {
      res.status(422).json({ message: 'insufficient parameters supplied' })
    }
  },
  delete: ( req, res ) => {
    res.status(200).json('userInfo delete');
  }
}