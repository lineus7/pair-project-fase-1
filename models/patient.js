'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User,{foreignKey:`UserId`})
    }
  }
  Patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {msg : `Name cannot be empty`},
        notEmpty : {msg : `Name cannot be empty`}
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {msg : `Gender cannot be empty`},
        notEmpty : {msg : `Gender cannot be empty`}
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {msg : `Age cannot be empty`},
        notEmpty : {msg : `Age cannot be empty`}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        allowNull : {msg : `UserId cannot be empty`},
        notEmpty : {msg : `UserId cannot be empty`}
      }
    },
    DoctorId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {msg : `Status cannot be empty`},
        notEmpty : {msg : `Status cannot be empty`}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        allowNull : {msg : `Email cannot be empty`},
        notEmpty : {msg : `Email cannot be empty`}
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};