'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    status_message: DataTypes.STRING
  }, {
    underscored: true,
  });
  user.associate = function(models) {
    user.hasMany(models.roomsuser, { foreignKey: 'user_id' });
  };
  return user;
};