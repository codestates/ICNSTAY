const express = require('express');
const router = express.Router();
const { user, accommodation } = require('../controller');
const axios = require('axios');

router.post( '/signin', user.signin );
router.post( '/signup', user.signup );
router.post( '/signout', user.signout );
router.get( '/userinfo', user.userinfo.get );
router.put( '/userinfo/:id', user.userinfo.put );
router.delete( '/userinfo/:id', user.userinfo.delete );
router.get( '/biddingList', user.biddingList );

router.get( '/accommodation', accommodation.list );
router.get( '/accommodation/:id', accommodation.detail );
router.post( '/accommodation/:id', accommodation.bid );

// 새로 추가된 내용
const clientID = '8c7f2d24ac16c0f2a4d3dc987439ddbb';

const callback = (res, req) => {
    console.log(req.authorizationCode)
    axios({
    method: 'post',
    url: `https://kauth.kakao.com/oauth/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      grant_type: "authorization_code",
      client_id: clientID,
      redirect_uri: "https://localhost:3000",
      code: req.authorizationCode
    }
  }).then((response) => {
    // accessToken = response.data.access_token;
    // res.status(200).json({ accessToken: accessToken })
    console.log(response);
  }).catch(e => {
    res.status(404)
  })
}
router.post('/callback', callback);
// 여가까지

module.exports = router;
