const axios = require('axios');
const qs = require('querystring');
const { user } = require('../../models');

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

    const tokenReciever = await axios.post('https://kauth.kakao.com/oauth/token', body, headers)
    const {access_token, refresh_token} = tokenReciever.data

    res.cookie('refreshToken', refresh_token, { sameSite: 'None', secure: true, httpOnly: true })

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
    
    res.status(200).json({access_token, userFinder});
  },
  signout: async (req, res) => {
    try{
      await axios.post('https://kapi.kakao.com/v1/user/logout', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${req.headers.access_token}`
        }
      });
      res.status(205).json({ message: 'successfully signed out' })
    }catch (err) {
      res.status(500).json({ message: 'server error' })
    }
  }
}