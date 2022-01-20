const express = require('express');
const rounter = express.Router();
const { user, accommodation } = require('../controller') 

rounter.post( '/signin', user.signin );
rounter.post( '/signup', user.signup );
rounter.post( '/signout', user.signout );
rounter.get( '/userinfo/:id', user.userinfo.get );
rounter.patch( '/userinfo/:id', user.userinfo.post );
rounter.delete( '/userinfo/:id', user.userinfo.delete );
rounter.get( '/biddingList', user.biddingList );

rounter.get( '/', accommodation.list );
rounter.get( '/:id', accommodation.detail );
rounter.post( '/:id', accommodation.bid );

module.exports = rounter;