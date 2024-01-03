const { Router } = require("express");
const getDriversHandler = require("../handlers/getDriversHandler");
const getDriverDetailHandler = require("../handlers/getDriverDetailHandler");
const deleteDriverHandler = require("../handlers/deleteDriverHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getDriverDetailHandler);
driversRouter.delete("/:id", deleteDriverHandler);

module.exports = driversRouter;
