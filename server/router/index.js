const express = require('express');
const router = express.Router();
const { user, accommodation } = require('../controller');

router.post( '/signin', user.signin );
router.post( '/signup', user.signup );
router.post( '/signout', user.signout );
router.get( '/userinfo', user.userinfo.get );
router.put( '/userinfo/:id', user.userinfo.put );
router.delete( '/userinfo/:id', user.userinfo.delete );
router.get( '/biddinglist', user.biddingList );
router.post( '/oauth/signin', user.oauth.signin );
router.post( '/oauth/signout', user.oauth.signout );

router.get( '/accommodation', accommodation.list );
router.get( '/accommodation/:id', accommodation.detail );
router.post( '/accommodation/:id', accommodation.bid );

module.exports = router;
