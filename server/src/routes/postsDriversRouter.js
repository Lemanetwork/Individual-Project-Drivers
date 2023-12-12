const { Router } = require("express");
const postsDriversHandler = require("../handlers/postDriversHandler");

const postsDriversRouter = Router();

postsDriversRouter.post("/", postsDriversHandler);

module.exports = postsDriversRouter;
