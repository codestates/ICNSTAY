'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accommodation.init({
    name: DataTypes.STRING,
    loaction: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accommodation',
  });
  return accommodation;
};