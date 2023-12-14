const getDriversByNameController = require("../controllers/getDriversByNameController");
const getAllDriversController = require("../controllers/getAllDriversController");

async function getDriversHandler(req, res) {
  const { forename } = req.query;

  try {
    if (forename) {
      const drivers = await getDriversByNameController(forename);
      res.status(200).json(drivers);
    } else {
      const drivers = await getAllDriversController();
      res.status(200).json(drivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = getDriversHandler;
