const db = require("../models");
const Adviser = db.Adviser
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
// Create and Save a new Adviser
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!", 
    });
    return;
  }

  // Create a adviser
  const adviser = {
    userId: req.body.userId,
    name: req.body.name,
    lastName: req.body.lastName,
    dni: req.body.dni,
    filename: req.file ? req.file.filename : ""

  };

  // Save Adviser in the database
  Adviser.create(adviser)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Adviser.",
      });
    });
};





// Retrieve all budgets from the database.
exports.findAll = (req, res) => {
  console.log(Adviser)
  Adviser.findAll()
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving budgets.",
      });
    });
};

// Retrieve all budgets from the database.
exports.findAllByUserId = (req, res) => {
  const id = req.params.id;

  Adviser.findAll({ where: { userId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving motorbikes.",
      });
    });
};

// Find a single Adviser with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Adviser.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Adviser with id=" + id,
      });
    });
};

// Find a single Adviser with an id
exports.countAdviser = (req, res) => {
  Adviser.count()
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving count for Advisers",
      });
    });
};
// Update a Adviser by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Adviser.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Adviser was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Adviser with id=${id}. Maybe Adviser was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Adviser with id=" + id,
      });
    });
};

// Delete a Adviser with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Adviser.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Adviser was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Adviser with id=${id}. Maybe Adviser was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Adviser with id=" + id,
      });
    });
};
