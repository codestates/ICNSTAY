const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = {
  get: async ( req, res ) => {
<<<<<<< Updated upstream
    if ( req.headers.accessToken ) {
      try {
        const tokenDecoder = jwt.verify(req.headers.accessToken, process.env.ACCESS_SECRET)
=======
<<<<<<< Updated upstream
    if ( req.cookies.refreshToken ) {
      try {
        const tokenDecoder = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET)
=======
    console.log(req.headers);
    if ( req.headers.accesstoken ) {
      try {
        const tokenDecoder = jwt.verify(req.headers.accesstoken, process.env.ACCESS_SECRET)
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        const { iat, exp, ...userInfo} = tokenDecoder;
        if ( !userInfo ) {
          res.status(404).json({ message: 'email not exist', data: null })
        }else {
          res.status(200).json(userInfo);
        }
      } catch (e) {
        if(e.name === 'TokenExpiredError'){
          res.status(401).json({ message: 'token expired' })
        }
      }
    } else {
      res.status(401).json({ message: 'token not exixt in cookies' })
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    if( req.body.password || req.body.mobile || req.body.username ) {
      try{
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
          where: { id },
          attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        })
        const userInfo = userFinder.dataValues
        res.clearCookie('refreshToken');
        const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, {
          expiresIn: '6h'
        })
        res.cookie('refreshToken', refreshToken, { sameSite: 'None', secure: false, httpOnly: false});
        res.status(200).json(userInfo);
      }catch(e){
        res.status(500).json({ message: 'server error' })
      }
    }else {
      res.status(422).json({ message: 'insufficient parameters supplied' })
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try{
      await user.destroy({
        where: { id }
      });
      res.status(200).json({ message: "successfully deleted" })
    }catch(e){
      res.status(500).json({ message: 'server error'})
    }
  }
}