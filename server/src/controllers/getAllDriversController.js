const { Driver, Team } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");
const cleanDriversInfo = require("../utils/cleanDriversInfo");

async function getAllDriversController() {
  const driversDb = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
    },
    through: {
      attributes: [],
    },
  });

  const cleanDriversDb = cleanDriversInfo(driversDb);

  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  const balancedInfoApi = balanceDriversInfo(driversApi);

  return [...cleanDriversDb, ...balancedInfoApi];
}

module.exports = getAllDriversController;
