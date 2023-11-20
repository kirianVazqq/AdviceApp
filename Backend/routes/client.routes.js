module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new budget
    router.post("/", auth.isAuthenticated, client.create);

    // Retrieve all budget
    router.get("/", auth.isAuthenticated, client.findAll);

    // Retrieve a single budget with id
    router.get("/:id", auth.isAuthenticated, client.findOne);

    // Retrieve all budget equals an id
    router.get("/user/:id", auth.isAuthenticated, client.findAllByUserId);

    // Update a budget with id
    router.put("/:id", auth.isAuthenticated, client.update);

    // Delete a budget with id
    router.delete("/:id", auth.isAuthenticated, client.delete);

    app.use('/api/clients', router);
};