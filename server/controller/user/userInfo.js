const jwt = require('jsonwebtoken');
const { user } = require('../../models');
const { decoder } = require('../token')

module.exports = {
  get: async ( req, res ) => {
    if ( req.headers.authorization ) {
      try {
        const tokenDecoder = jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_SECRET);
        const { iat, exp, ...userInfo} = tokenDecoder;
        const userFinder = await user.findOne({
          where: { id : userInfo.id }
        })
        if ( !userFinder ) {
          res.status(404).json({ message: 'email not exist', data: null })
        }else {
          res.status(200).json(userInfo);
        }
      } catch (err) {
        console.log('here', err.name)
        if (req.cookies.refreshToken) {
          try {
            // console.log('억세스토큰 만료 리프레시 있음');
            const tokenDecoder = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
            const { exp, iat, ...userInfo } = tokenDecoder;
            const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
              expiresIn: '1h'
            })
            res.status(200).json({ accessToken, userInfo })
          } catch (err) {
            if (err.name === 'TokenExpiredError'){
              // console.log('리프레시 억세스 둘다 만료');
              res.status(401).json({ message: 'invaild refresh token' })
            }
          }
        }else {
          // console.log('억세스 만료인데 리프레시가 없음')
          res.status(401).json({ message: 'wrong approch' })
        }
      }
    } else {
      if ( req.cookies.refreshToken ) {
        // console.log('situ 2')
        try {
          const tokenDecoder = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
          const { exp, iat, ...userInfo } = tokenDecoder;
          const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
            expiresIn: '1h'
          })
          res.status(200).json({ accessToken, userInfo })
        }catch(err){
          if (err.name === 'TokenExpiredError'){
            // console.log('억세스 없는데 리프레시 만료')
            res.status(401).json({ message: 'invaild access token' })
          }
        }
      }else { 
        // console.log('토큰 다 없음')
        res.status(401).json({ message: 'wrong approch' })
      }
    }
  },

  put: async (req, res) => {
    if( req.body.password || req.body.mobile || req.body.username ) {
      // const tokenDecoder = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
      const { id } = req.params;
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
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
      })
      const refreshToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: '6h'
      })
      res.clearCookie('refreshToken');
      res.cookie('refreshToken', refreshToken, { sameSite: 'None', secure: true, httpOnly: true});
      res.status(200).json({accessToken, userInfo});
    }else {
      res.status(422).json({ message: 'insufficient parameters supplied' })
    }
  },
  delete: async (req, res) => {
    if ( req.cookies.accessToken ) {
      const tokenDecoer = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
      const { iat, exp, ...userInfo } = tokenDecoer;
      await user.destroy({
        where: userInfo
      });
      res.clearCookie( 'refreshToken' );
      res.status(200).json({ message: "successfully deleted" })
    }else {
      res.status(401).json({ message: 'invalid access token'})
    }

  }
}