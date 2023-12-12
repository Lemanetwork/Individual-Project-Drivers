const { getDriverById } = require("../controllers/getDriverDetailController");

async function getDriverDetailHandler(req, res) {
  const { idDriver } = req.params;
  let src = null;

  if (isNaN(idDriver)) src = "db";
  else src = "api";

  try {
    const driverDetail = await getDriverById(idDriver, src);
    res.status(200).json(driverDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getDriverDetailHandler,
};
