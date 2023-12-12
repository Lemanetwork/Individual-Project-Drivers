const { Router } = require("express");
const driversRouter = require("./driversRouter");
const postsDriversRouter = require("./postsDriversRouter");
const teamsRouter = require("./teamsRouter");

const router = Router();

router.use("/drivers", driversRouter);
router.use("/posts", postsDriversRouter);
router.use("/teams", teamsRouter);

module.exports = router;
