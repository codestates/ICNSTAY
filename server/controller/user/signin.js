const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = async (req, res) => {
  // res.status(200).json('signin');
  const { email, password } = req.body;
    // non-social signin case
  try {
    // console.log(email, password);
    const userFinder = await user.findOne({
      where: { email, password },
      attributes: { exclude : ['password', 'createdAt', 'updatedAt'] }
    });
    if (!userFinder) {
      res.status(404).json({ message: 'Invalid user' });
    } else {
      const userInfo = userFinder.dataValues;
  
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, {
        expiresIn: '7h',
      });
  
<<<<<<< Updated upstream
      const cookieOption = {
        sameSite: 'None',
        secure: false,
        httpOnly: false,
        domain: 'icnstay.shop'
      };
      res.cookie('refreshToken', refreshToken, cookieOption);
=======
      // const cookieOption = {
      //   sameSite: 'None',
      //   secure: false,
      //   httpOnly: false,
      //   domain: 'icnstay.shop'
      // };
      // res.cookie('refreshToken', refreshToken, cookieOption);
>>>>>>> Stashed changes
      res.status(200).json({ accessToken, messeage: 'ok' });
    }
  } catch (e) {
    console.log(e)
  }
};
