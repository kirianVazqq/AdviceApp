const db = require("../models");
const Note = db.Note;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
// Create and Save a new note
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);

  // Create a note
  const note = {
    userId: req.body.userId,
    info: req.body.info,
  };

  // Save Note in the database
  Note.create(note)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the note.",
      });
    });
};

// Retrieve all budgets from the database.
exports.findAll = (req, res) => {
  console.log(Note);
  Note.findAll()
    .then((data) => {
      console.log(data);
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

  Note.findAll({ where: { userId: id } })
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

// Find a single Note with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Note.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Note with id=" + id,
      });
    });
};

// Update a Note by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Note with id=" + id,
      });
    });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id,
      });
    });
};
