module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // Este campo es obligatorio
      validate: {
        isEmail: true, // Esto valida que sea un formato de correo válido
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false, // Este campo es obligatorio
      // Considera agregar más validaciones para la seguridad de la contraseña
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false, // Este campo es obligatorio
    },
  });
  return User;
};
