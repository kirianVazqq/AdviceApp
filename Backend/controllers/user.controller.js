const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Verificación de datos: asegurarse de que todos los campos requeridos estén presentes
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Creación del objeto usuario
  const user = {
    email: req.body.email,
    password: req.body.password, // Considera encriptar esta contraseña antes de guardarla
    username: req.body.username,
  };

  // Inserción en la base de datos
  User.create(user)
    .then((data) => {
      res.send(data); // Devuelve el usuario creado; considera no devolver la contraseña en la respuesta
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = (req, res) => {
  // Obtener el ID desde los parámetros de la URL
  const id = req.params.id;

  // Buscar el usuario por ID
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data); // Envía el usuario encontrado como respuesta
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
      where: { id: id }
  })
  .then(num => {
      if (num == 1) {
          res.send({
              message: "User was updated successfully."
          });
      } else {
          res.send({
              message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Error updating User with id=" + id
      });
  });
};


exports.delete = (req, res) => {
  const id = req.params.id; // Suponemos que pasas el ID como parámetro en la URL

  User.destroy({
      where: { id: id }
  })
  .then(num => {
      if (num == 1) {
          res.send({
              message: "User was deleted successfully!"
          });
      } else {
          res.send({
              message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: "Could not delete User with id=" + id
      });
  });
};
