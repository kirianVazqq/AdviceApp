module.exports = app => {
    const adviser = require("../controllers/adviser.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new Adviser
    router.post("/", auth.isAuthenticated, adviser.create);

    // Retrieve all Adviser
    router.get("/", auth.isAuthenticated, adviser.findAll);

    // Retrieve a single Adviser with id
    router.get("/:id", auth.isAuthenticated, adviser.findOne);

    // Retrieve all Adviser equals an id
    router.get("/user/:id", auth.isAuthenticated, adviser.findAllByUserId);

    // Update a Adviser with id
    router.put("/:id", auth.isAuthenticated, adviser.update);

    // Delete a Adviser with id
    router.delete("/:id", auth.isAuthenticated, adviser.delete);

    app.use('/api/advisers', router);
};