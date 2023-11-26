module.exports = (sequelize, Sequelize) => {
    const Adviser = sequelize.define("adviser", {
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
      filename: {
        type: Sequelize.STRING
      }
  
    });
  
    Adviser.associate = function (models) {
        Adviser.belongsTo(models.user, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as: "users",
      });
    };
  
    return Adviser;
  };