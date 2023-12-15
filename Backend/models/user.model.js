module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Asegura que el email sea único
      allowNull: false, // Asegura que el email no sea nulo
    },
    username: {
      type: DataTypes.STRING,
      unique: true, // Asegura que el username sea único
      allowNull: false, // Asegura que el username no sea nulo
    },
    rol: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
