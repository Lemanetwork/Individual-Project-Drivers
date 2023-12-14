const { Driver } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");

async function getAllDriversController() {
  const driversDb = await Driver.findAll();
  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  const balancedInfoApi = balanceDriversInfo(driversApi);

  return [...driversDb, ...balancedInfoApi];
}

module.exports = getAllDriversController;
