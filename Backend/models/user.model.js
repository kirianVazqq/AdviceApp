module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  });

  return User;
};


