'use strict';
const {
Model
} = require('sequelize');
const user = require('./user')
module.exports = (sequelize, DataTypes) => {
  class accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accommodation.belongsToMany(models.user, {
        through: 'user_accommodation',
        foreignKey: 'accommodationId'
      })
    }
  }
  accommodation.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    minPrice: DataTypes.STRING,
    maxPrice: DataTypes.STRING,
    due: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'accommodation',
  });
  return accommodation;
};