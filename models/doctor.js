'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User, { foreignKey: `UserId` })
    }
  }
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `SIP cannot be empty` },
        notEmpty: { msg: `SIP cannot be empty` }
      }
    },
    sip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `SIP cannot be empty` },
        notEmpty: { msg: `SIP cannot be empty` }
      }
    },
    specialist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Specialization cannot be empty` },
        notEmpty: { msg: `Specialization cannot be empty` }
      }
    },
    exp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Experience cannot be empty` },
        notEmpty: { msg: `Experience cannot be empty` }
      }
    },
    hospital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Hospital cannot be empty` },
        notEmpty: { msg: `Hospital cannot be empty` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Price cannot be empty` },
        notEmpty: { msg: `Price cannot be empty` }
      }
    },
    UserId: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Email cannot be empty` },
        notEmpty: { msg: `Email cannot be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};