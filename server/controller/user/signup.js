const { user } = require('../../models')

module.exports = async (req, res) => {
  // res.status(200).json( 'signup' );
  if ( req.body.username && req.body.email && req.body.password && req.body.mobile ) {
    const { username, email, password, mobile } = req.body;
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