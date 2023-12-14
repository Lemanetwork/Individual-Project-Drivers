const { Router } = require("express");
const getDriversHandler = require("../handlers/getDriversHandler");
const getDriverDetailHandler = require("../handlers/getDriverDetailHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getDriverDetailHandler);

module.exports = driversRouter;
