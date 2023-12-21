'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsTo(models.Doctor,{foreignKey:`DoctorId`})
      Chat.belongsTo(models.Patient,{foreignKey:`PatientId`})
      // define association here
    }
  }
  Chat.init({
    text: DataTypes.TEXT,
    DoctorId: DataTypes.INTEGER,
    PatientId: DataTypes.INTEGER,
    from: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};