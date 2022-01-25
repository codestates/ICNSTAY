const axios = require('axios');
const qs = require('querystring');
const { user } = require('../../models');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  signin: async (req, res) => {
    const { authorizationCode } = req.body;
    // console.log(authorizationCode)
    const body = qs.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: 'https://localhost:3000',
    code: authorizationCode,
    client_secret : process.env.KAKAO_CLIENT_SECRET
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    try{
      const tokenReciever = await axios.post('https://kauth.kakao.com/oauth/token', body, headers)
      const {access_token, refresh_token} = tokenReciever.data
      console.log(tokenReciever.data)
  
      res.cookie('refresh_token', refresh_token, { sameSite: 'None', secure: true, httpOnly: true })
  
      const userInfoReciver = await axios.get("https://kapi.kakao.com/v2/user/me", {
        body: {
          property_keys: ['kakao_account.email']
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`
        }
      })
      const { profile, email } = userInfoReciver.data.kakao_account;
      const [userFinder, created] = await user.findOrCreate({
        where: { username: profile.nickname, email },
        defaults: { social: 'kakao' },
        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
      })
      const userInfo = userFinder.dataValues
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, {
        expiresIn: '6h'
      })
      res.cookie('refreshToken', refreshToken, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      })
      res.status(200).json({access_token, userFinder});
    }catch (e) {
      res.status(205).json({ message: "server error" })
    }
  },
  signout: async (req, res) => {
    try{
      console.log(req.headers.accesstoken);
      const result = await axios.post('https://kapi.kakao.com/v1/user/logout', { }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${req.headers.accesstoken}`
        }
      });
      // console.log(result)
      const { id } = result.data
      res.clearCookie('refreshToken')
      res.status(205).json({ id, message: 'successfully sign out' }) //클라이언트에서 응답 못받음?
      console.log('to here')
    }catch (err) {
      console.log(err);
      res.status(500).json({ message: 'server error' })
    }
  }
}