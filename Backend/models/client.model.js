module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      dni: {
        type: Sequelize.STRING,
      },
      numberAccount: {
        type: Sequelize.STRING,
      },
    });
  
    Client.associate = function (models) {
      Client.belongsTo(models.user, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as: "users",
      });
    };
  
    return Client;
  };