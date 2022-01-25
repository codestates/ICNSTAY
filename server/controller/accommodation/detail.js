const { accommodation } = require('../../models');
const imageList = require('../../imageLists');
const getRandomIdx = () => {
  return Math.floor(Math.random() * 11);
};

module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const accommodationFinder = await accommodation.findOne({
      where: { id }
    });
    if( accommodationFinder ){
      const { createdAt, updatedAt, ...accInfo } = accommodationFinder.dataValues
      accInfo.image = [ imageList[ getRandomIdx() ], imageList[ getRandomIdx() ], imageList[ getRandomIdx() ]]
      res.status(200).json(accInfo)
    }else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'server error' });
  }
}