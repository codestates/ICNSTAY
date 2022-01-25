const { accommodation } = require('../../models');
const imageList = require('../../imageLists');
const getRandomIdx = () => {
  return Math.floor(Math.random() * 11);
};

module.exports = async (req, res) => {
  // res.status(200).json('get list');
  try {
    const accommodationFinder = await accommodation.findAll();
    if( accommodationFinder ){
      const accInfo = accommodationFinder.map(acc => {
        const { createdAt, updatedAt, ...accInfo } = acc.dataValues
        accInfo.image = [ imageList[ getRandomIdx() ], imageList[ getRandomIdx() ], imageList[ getRandomIdx() ]]
        return accInfo
      })
  
      res.status(200).json({ accInfo })
    }else {
      res.status(404).json({ message: 'accomodatin empty' })
    }
  } catch (e) {
    res.status(404).json({ message: 'server error' })
  }
}