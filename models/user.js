'use strict';
const {
  Model
} = require('sequelize');
const {User} = require(`./index`)
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Doctor, { foreignKey: `UserId` })
      User.hasOne(models.Patient, { foreignKey: `UserId` })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Username cannot be empty` },
        notEmpty: { msg: `Username cannot be empty` },
        async isUnique(value) {
          let data = await User.findOne({where:{username:value}})
          if (data) {
            throw new Error(`Username sudah terdaftar`);
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Password cannot be empty` },
        notEmpty: { msg: `Password cannot be empty` },
        len : {args : [8,100], msg :`Password minimum length is 8`}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(user, option) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};