const { user, accommodation, user_accommodation } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const finder = await user_accommodation.findAll({
    where: { userId: id },
    attributes: { exclude: ['createdAt', 'updatedAt']},
    include: {
      model: accommodation,
      // through: { attributes: [] },
      attributes: ['name'],
    }
  });
  // console.log(finder.map(list => list.dataValues.accommodation.name)) => 숙박시설 name 조회
  res.status(200).json('get user bidding list')
}