const { Driver } = require("../db");
const axios = require("axios");
const { balanceInfo, filterDrivers } = require("../utils/index");

async function getDriversByName(forename) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  const driversDb = await Driver.findAll({ where: { forename } });
  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  let filteredInfoApi = filterDrivers(driversApi, forename);

  const balancedInfoApi = balanceInfo(filteredInfoApi);

  filteredInfoApi = [...driversDb, ...balancedInfoApi];

  if (filteredInfoApi.length === 0)
    throw new Error(`No se encontraron Drivers con el nombre: ${forename}`);
  else if (filteredInfoApi.length > 15)
    filteredInfoApi = filteredInfoApi.slice(0, 15);

  return filteredInfoApi;
}

async function getAllDrivers() {
  const driversDb = await Driver.findAll();
  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  const balancedInfoApi = balanceInfo(driversApi);

  return [...driversDb, ...balancedInfoApi];
}

module.exports = {
  getDriversByName,
  getAllDrivers,
};
