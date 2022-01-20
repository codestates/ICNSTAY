const express = require('express');
const router = express.Router();
const { user, accommodation } = require('../controller') 

router.post( '/signin', user.signin );
router.post( '/signup', user.signup );
router.post( '/signout', user.signout );
router.get( '/userinfo/:id', user.userinfo.get );
router.put( '/userinfo/:id', user.userinfo.put );
router.delete( '/userinfo/:id', user.userinfo.delete );
router.get( '/biddingList', user.biddingList );

router.get( '/accommodation', accommodation.list );
router.get( '/accommodation/:id', accommodation.detail );
router.post( '/accommodation/:id', accommodation.bid );// 추후 수정 필요: 코딩 위치가 user.router 위로 올라가면 경로 꼬임

module.exports = router;




