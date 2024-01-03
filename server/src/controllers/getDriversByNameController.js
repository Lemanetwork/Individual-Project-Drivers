const { Driver, Team } = require("../db");
const axios = require("axios");
const balanceDriversInfo = require("../utils/balanceDriversInfo");
const filterDriversByName = require("../utils/filterDriversByName");
const cleanDriversTeams = require("../utils/cleanDriversTeams");

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

  const dataDb = cleanDriversTeams(driversDb);

  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  let dataApi = filterDriversByName(driversApi, forename);

  dataApi = balanceDriversInfo(dataApi);

  let allData = [...dataDb, ...dataApi];

  if (allData.length === 0)
    throw new Error(`We did not found Drivers with the forename: ${forename}`);
  else if (allData.length > 15) allData = allData.slice(0, 15);

  return allData;
}

module.exports = getDriversByNameController;
