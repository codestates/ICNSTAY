const { user } = require('../../models')

module.exports = async (req, res) => {
  // res.status(200).json( 'signup' );
  if ( req.body.username && req.body.email && req.body.password) { // mobile
    let mobile
    // console.log(req.body)
    if ( req.body.mobile ) {
      mobile = req.body.mobile;
    }else {
      mobile = null;
    }
    const { username, email, password } = req.body;
    const social = null;
    const [ userInfo, created ] = await user.findOrCreate({
      where: { username, email, social },
      defaults: { password, mobile }
    });
  
    if ( created ) {
      res.status(201).json({ message: 'sign-up ok' });
    }else {
      res.status(409).json({ message: 'email exist' });
    }
  }else {
    res.status(422).json({ message: 'insufficient parameters supplied' });
    return;
  }
}