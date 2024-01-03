const { Driver, Team } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");
const cleanDriversTeams = require("../utils/cleanDriversTeams");

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

  const cleanDriversDb = cleanDriversTeams(driversDb);

  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  const balancedInfoApi = balanceDriversInfo(driversApi);

  return [...cleanDriversDb, ...balancedInfoApi];
}

module.exports = getAllDriversController;
