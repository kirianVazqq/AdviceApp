module.exports = app => {
    const budgets = require("../controllers/budgets.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new budget
    router.post("/", auth.isAuthenticated, budgets.create);

    // Retrieve all budget
    router.get("/", auth.isAuthenticated, budgets.findAll);

    // Retrieve a single budget with id
    router.get("/:id", auth.isAuthenticated, budgets.findOne);

    // Retrieve all budget equals an id
    router.get("/user/:id", auth.isAuthenticated, budgets.findAllByUserId);

    // Update a budget with id
    router.put("/:id", auth.isAuthenticated, budgets.update);

    // Delete a budget with id
    router.delete("/:id", auth.isAuthenticated, budgets.delete);

    app.use('/api/budgets', router);
};