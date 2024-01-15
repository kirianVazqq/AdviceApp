const db = require("../models");
const { sequelize, Sequelize, Op } = require('../models'); // Asegúrate de que la ruta sea correcta

const Budget = db.Budget
const User = db.User;
const jwt = require('jsonwebtoken');
// Create and Save a new budget
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!", 
    });
    return;
  }

  // Create a budget
  const budget = {
    userId: req.body.userId,
    clientId: req.body.clientId,
    name: req.body.name,
    lastName: req.body.lastName,
    typeBudget: req.body.typeBudget,
    brand: req.body.brand,
    model: req.body.model,
    tuition: req.body.tuition,
    kilometers: req.body.kilometers,
    horsepower: req.body.horsepower,
    typeVehicle: req.body.typeVehicle,
    insuranceName: req.body.insuranceName,
    price: req.body.price,
  };

  // Save budget in the database
  Budget.create(budget)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the budget.",
      });
    });
};


exports.getTotalBudgetsByUser = (req, res) => {
  Budget.findAll({
    attributes: ['UserId', [sequelize.fn('COUNT', 'id'), 'totalBudgets']],
    include: [{ model: User, attributes: ['username'] }],
    group: ['UserId'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving total budgets by user",
      });
    });
};

// Retrieve all budgets from the database.
exports.findAll = (req, res) => {
  console.log(Budget)
  Budget.findAll()
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

  Budget.findAll({ where: { userId: id } })
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

// Find a single budget with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Budget.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving budget with id=" + id,
      });
    });
};

// Update a budget by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Budget.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "budget was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update budget with id=${id}. Maybe budget was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating budget with id=" + id,
      });
    });
};

// Delete a budget with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Budget.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "budget was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete budget with id=${id}. Maybe budget was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete budget with id=" + id,
      });
    });
};
