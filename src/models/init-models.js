var DataTypes = require("sequelize").DataTypes;
var sequelize = require("../db/db-sequelize");
var _Activity = require("./activity");
var _Client = require("./client");
var _Company = require("./company");
var _Order = require("./order");
var _OrderComment = require("./order_comment");
var _Program = require("./program");
var _Region = require("./region");
var _Sequelizemeta = require("./sequelizemeta");
var _Source = require("./source");
var _Status = require("./status");
var _StatusRegister = require("./status_register");
var _User = require("./user");


  var Activity = _Activity(sequelize, DataTypes);
  var Client = _Client(sequelize, DataTypes);
  var Company = _Company(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var OrderComment = _OrderComment(sequelize, DataTypes);
  var Program = _Program(sequelize, DataTypes);
  var Region = _Region(sequelize, DataTypes);
  var Sequelizemeta = _Sequelizemeta(sequelize, DataTypes);
  var Source = _Source(sequelize, DataTypes);
  var Status = _Status(sequelize, DataTypes);
  var StatusRegister = _StatusRegister(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Client.belongsTo(Activity, { as: "activity", foreignKey: "activity_id"});
  Activity.hasMany(Client, { as: "clients", foreignKey: "activity_id"});
  Order.belongsTo(Activity, { as: "activity", foreignKey: "activity_id"});
  Activity.hasMany(Order, { as: "orders", foreignKey: "activity_id"});
  Order.belongsTo(Client, { as: "client", foreignKey: "client_id"});
  Client.hasMany(Order, { as: "orders", foreignKey: "client_id"});
  Order.belongsTo(Company, { as: "company", foreignKey: "company_id"});
  Company.hasMany(Order, { as: "orders", foreignKey: "company_id"});
  OrderComment.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(OrderComment, { as: "order_comments", foreignKey: "order_id"});
  StatusRegister.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(StatusRegister, { as: "status_registers", foreignKey: "order_id"});
  Order.belongsTo(Program, { as: "program", foreignKey: "program_id"});
  Program.hasMany(Order, { as: "orders", foreignKey: "program_id"});
  Client.belongsTo(Region, { as: "region", foreignKey: "region_id"});
  Region.hasMany(Client, { as: "clients", foreignKey: "region_id"});
  Order.belongsTo(Region, { as: "region", foreignKey: "region_id"});
  Region.hasMany(Order, { as: "orders", foreignKey: "region_id"});
  Order.belongsTo(Source, { as: "source", foreignKey: "source_id"});
  Source.hasMany(Order, { as: "orders", foreignKey: "source_id"});
  Order.belongsTo(Status, { as: "status", foreignKey: "status_id"});
  Status.hasMany(Order, { as: "orders", foreignKey: "status_id"});
  StatusRegister.belongsTo(Status, { as: "status", foreignKey: "status_id"});
  Status.hasMany(StatusRegister, { as: "status_registers", foreignKey: "status_id"});
  Order.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Order, { as: "orders", foreignKey: "user_id"});
  OrderComment.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(OrderComment, { as: "order_comments", foreignKey: "user_id"});
  StatusRegister.belongsTo(User, { as: "operator", foreignKey: "operator_id"});
  User.hasMany(StatusRegister, { as: "status_registers", foreignKey: "operator_id"});

  module.exports = {
    Activity,
    Client,
    Company,
    Order,
    OrderComment,
    Program,
    Region,
    Sequelizemeta,
    Source,
    Status,
    StatusRegister,
    User,
  };

