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
      typeVehicle: {
        type: Sequelize.STRING
      },
      insuranceName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
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