const { DataTypes, Model } = require('sequelize');
const RoomModel = require('./room.model');
const UserModel = require('./user.model');
const sequelize = require('../db/db-sequelize');
class MessagesModel extends Model {}

MessagesModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    user_id : {
        type: DataTypes.INTEGER,
    },
    room_id: {
        type: DataTypes.INTEGER,
    },
    message: {
        type: DataTypes.STRING(200)
    }
}, {
  sequelize,
  modelName: 'MessagesModel',
  tableName: 'messages',
  timestamps: true,
});
MessagesModel.belongsTo(RoomModel, { as: 'room', foreignKey: 'room_id' })
MessagesModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' })

module.exports = MessagesModel;