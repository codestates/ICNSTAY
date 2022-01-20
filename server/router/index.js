const express = require('express');
const rounter = express.Router();
const { user, accommodation } = require('../controller') 

rounter.post( '/signin', user.signin );
rounter.post( '/signup', user.signup );
rounter.post( '/signout', user.signout );
rounter.get( '/userinfo/:id', user.userinfo.get );
rounter.post( '/userinfo/:id', user.userinfo.post );
rounter.delete( '/userinfo/:id', user.userinfo.delete );
rounter.get( '/biddingList', user.biddingList );

rounter.get( '/', accommodation.list );
rounter.get( '/:id', accommodation.detail );
rounter.post( '/:id', accommodation.bid );
rounter.post( '/:id', accommodation.book ); // 추후 수정 필요: 코딩 위치가 user.router 위로 올라가면 경로 꼬임

module.exports = rounter;




