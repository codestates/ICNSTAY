module.exports = (req, res) => {
  if ( req ){
    // res.clearCookie( 'refreshToken' );
    res.status(205).json({ message: 'successfully signed out' })
  }else {
    res.status(500).json({ message: 'server error' })
  }
}