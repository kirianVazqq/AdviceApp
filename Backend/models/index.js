'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User = require("./user.model")(sequelize,Sequelize)
db.Budget = require("./budgets.model")(sequelize,Sequelize)
db.Note = require("./note.model")(sequelize,Sequelize)
db.Client = require("./client.model")(sequelize,Sequelize)
db.Adviser = require("./adviser.model")(sequelize,Sequelize)

db.user.hasMany(db.Budget);
db.Budget.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});

db.client.hasMany(db.Budget);
db.Budget.belongsTo(db.client, {
  onDelete: "CASCADE",
  foreignKey: "clientId"
});
db.user.hasMany(db.Note);
db.Note.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});
db.user.hasMany(db.Client);
db.Client.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});
db.user.hasMany(db.Adviser);
db.Adviser.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: "userId"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
