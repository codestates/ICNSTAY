const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = async (req, res) => {
  // res.status(200).json('signin');
  const { email, password } = req.body;
  const userFinder = await user.findOne({
    where: { email, password }
  })
  if ( !userFinder ){
    res.status(404).json( { message: 'Invalid user'} );
  }else {
    const { createdAt, updatedAt, password, ...userInfo } = userFinder.dataValues;

    const accessToken = jwt.sign( userInfo, process.env.ACCESS_SECRET, {
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign( userInfo, process.env.REFRESH_SECRET, {
      expiresIn: '5h'
    });

    const cookieOption = {
      sameSite: 'None',
      secure: true,
      httpOnly: true
    }
    res.cookie( 'refreshToken', refreshToken, cookieOption )
    res.status(200).json( {accessToken ,messeage: 'ok'} )
  }
}