'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    message: DataTypes.STRING,
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    message.belongsTo(models.room, { foreignKey: 'room_id' });
  };
  return message;
};