module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {

        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      typeBudget: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      tuition: {
        type: Sequelize.STRING
      },
      kilometers: {
        type: Sequelize.INTEGER
      },
      horsepower: {
        type: Sequelize.INTEGER
      },
      typeVehicle: {
        type: Sequelize.STRING
      },
      insuranceName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
    });
  
    Budget.associate = function(models) {
        Budget.belongsTo(models.user, {
        onDelete: "CASCADE",
        foreignKey: "userId",
        as: "users",
      })
    }
  
    return Budget;
  };