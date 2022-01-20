const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = async (req, res) => {
  // res.status(200).json('signin');
  const { email, password } = req.body;
  if ( req.body.social ) { // social signin case
    const { social } = req.body;
    const basicUserInfo = await user.findOne({
      where: { email, password, social }
    })
  } else { // non-social signin case
    const basicUserInfo = await user.findOne({
      where: { email, password }
    })
    if ( !basicUserInfo ){
      res.status(404).json( { message: 'Invalid user'} );
    }else {
      const paysload = { ...basicUserInfo.dataValues };
      delete paysload.password;
  
      const accessToken = jwt.sign( paysload, process.env.ACCESS_SECRET, {
        expiresIn: '3h'
      });
      const refreshToken = jwt.sign( paysload, process.env.REFRESH_SECRET, {
        expiresIn: '7h'
      });
  
      const cookieOption = {
        sameSite: 'None',
        secure: true,
        httpOnly: true
      }
      res.cookie( 'refreshToken', refreshToken, cookieOption )
      res.cookie( 'accessToken', accessToken, cookieOption )
      res.status(200).json( { messeage: 'ok'} )
    }
  }
}