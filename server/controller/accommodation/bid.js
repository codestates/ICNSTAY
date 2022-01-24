const jwt = require('jsonwebtoken');
const { user_accommodation } = require('../../models');

module.exports = async (req, res) => {
  // console.log(req.params.id)
  const accommodationId = req.params.id;
  const { checkInDate, checkOutDate, biddingPrice } = req.body;
  if ( checkOutDate && checkOutDate && biddingPrice ) {
    const { id } = jwt.verify( req.cookies.accessToken, process.env.ACCESS_SECRET );
    await user_accommodation.create({
      userId: id,
      accommodationId,
      checkInDate,
      checkOutDate,
      biddingPrice,
    })
    res.status(201).json({ message: 'bid sucessfully' })
  } else {
    res.status(422).json({ message: 'insufficient parameters supplied' })
  }
}