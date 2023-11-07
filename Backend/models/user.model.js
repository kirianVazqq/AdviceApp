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


// module.exports = (sequelize, Sequelize) => {
//   const User = sequelize.define("user", {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false, // Este campo es obligatorio
//       unique: true,
//       validate: {
//         isEmail: true, // Esto valida que sea un formato de correo válido
//       },
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false, // Este campo es obligatorio
//       // Considera agregar más validaciones para la seguridad de la contraseña
//     },
//     username: {
//       type: Sequelize.STRING,
//       unique: true,
//       allowNull: false, // Este campo es obligatorio
//     },
//   });
//   return User;
// };
