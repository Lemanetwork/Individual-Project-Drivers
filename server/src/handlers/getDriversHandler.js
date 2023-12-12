const {
  getDriversByName,
  getAllDrivers,
} = require("../controllers/getDriversControllers");

async function getDriversHandler(req, res) {
  const { forename } = req.query;

  try {
    if (forename) {
      const drivers = await getDriversByName(forename);
      res.status(200).json(drivers);
    } else {
      const drivers = await getAllDrivers();
      res.status(200).json(drivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getDriversHandler };
