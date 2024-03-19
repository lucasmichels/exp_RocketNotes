const { Router } = require("express");

const userRouter = require("./user.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();
routes.use("/users", userRouter); //1- acha as routes e vai para userRouter
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;