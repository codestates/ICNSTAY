'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_accommodation.init({
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    checkInDate: DataTypes.STRING,
    checkOutDate: DataTypes.STRING,
    biddingPrice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_accommodation',
  });
  return user_accommodation;
};
