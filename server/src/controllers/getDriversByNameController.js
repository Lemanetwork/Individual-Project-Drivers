const { Driver, Team } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");
const filterDrivers = require("../utils/filterDrivers");
const cleanDriversInfo = require("../utils/cleanDriversInfo");

async function getDriversByNameController(forename) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  const driversDb = await Driver.findAll({
    where: { forename },
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dataDb = cleanDriversInfo(driversDb);

  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  let dataApi = filterDrivers(driversApi, forename);

  dataApi = balanceDriversInfo(dataApi);

  let allData = [...dataDb, ...dataApi];

  if (allData.length === 0)
    throw new Error(`No se encontraron Drivers con el nombre: ${forename}`);
  else if (allData.length > 15) allData = allData.slice(0, 15);

  return allData;
}

module.exports = getDriversByNameController;
