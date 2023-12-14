const { Driver } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");
const filterDrivers = require("../utils/filterDrivers");

async function getDriversByNameController(forename) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  const driversDb = await Driver.findAll({ where: { forename } });
  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  let filteredInfoApi = filterDrivers(driversApi, forename);

  const balancedInfoApi = balanceDriversInfo(filteredInfoApi);

  filteredInfoApi = [...driversDb, ...balancedInfoApi];

  if (filteredInfoApi.length === 0)
    throw new Error(`No se encontraron Drivers con el nombre: ${forename}`);
  else if (filteredInfoApi.length > 15)
    filteredInfoApi = filteredInfoApi.slice(0, 15);

  return filteredInfoApi;
}

module.exports = getDriversByNameController;
