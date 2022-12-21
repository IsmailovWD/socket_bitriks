const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db-sequelize');
class RoomModel extends Model {}

RoomModel.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50)
    }
}, {
  sequelize,
  modelName: 'RoomModel',
  tableName: 'room',
  timestamps: false
});

module.exports = RoomModel;