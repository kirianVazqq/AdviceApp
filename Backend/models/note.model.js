module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("note", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    info: {
      type: Sequelize.STRING,
    },
  });

  Note.associate = function (models) {
    Note.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "users",
    });
  };

  return Note;
};
