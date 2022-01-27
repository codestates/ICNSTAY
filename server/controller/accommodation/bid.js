const jwt = require('jsonwebtoken');
const { user_accommodation, accommodation } = require('../../models');

module.exports = async (req, res) => {
  // console.log(req.params.id)
  const accommodationId = req.params.id;
  const { checkInDate, checkOutDate, biddingPrice } = req.body;
  if ( checkOutDate && checkOutDate && biddingPrice ) {
    try{
<<<<<<< Updated upstream
      const { id } = jwt.verify( req.headers.accessToken, process.env.ACCESS_SECRET );
=======
<<<<<<< Updated upstream
      const { id } = jwt.verify( req.cookies.refreshToken, process.env.REFRESH_SECRET );
=======
      const userid = req.headers.userid;
      console.log(userid)
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      await user_accommodation.create({
        userId: userid,
        accommodationId,
        checkInDate,
        checkOutDate,
        biddingPrice: biddingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
      })
      try{
        const accommodationFinder = await accommodation.findOne({
          where: { id : accommodationId }
        })
        const { maxPrice } = accommodationFinder
        const priceNumber = Number(maxPrice.slice(0, maxPrice.length - 1).split(',').join(''));
        if(priceNumber < Number(biddingPrice)){
          await accommodation.update({
            maxPrice: biddingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
          },{
            where: { id: accommodationId }
          });
        }
      }catch (e) {

      }
      res.status(201).json({ message: 'bid sucessfully' })
    }catch(e){
      if(e.name === 'JsonWebTokenError'){
        console.log(e.name)
      }else if(e.name === 'TokenExpiredError'){
        console.log(e.name)
      }
    }
  } else {
    res.status(422).json({ message: 'insufficient parameters supplied' })
  }
}