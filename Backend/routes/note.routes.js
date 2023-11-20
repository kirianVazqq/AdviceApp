module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");
  const auth = require("../controllers/auth.js");

  var router = require("express").Router();
  // Create a new note
  router.post("/", auth.isAuthenticated, notes.create);

  // Retrieve all note
  router.get("/", auth.isAuthenticated, notes.findAll);

  // Retrieve a single note with id
  router.get("/:id", auth.isAuthenticated, notes.findOne);

  // Retrieve all note equals an id
  router.get("/user/:id", auth.isAuthenticated, notes.findAllByUserId);

  // Update a note with id
  router.put("/:id", auth.isAuthenticated, notes.update);

  // Delete a note with id
  router.delete("/:id", auth.isAuthenticated, notes.delete);

  app.use("/api/note", router);
};
