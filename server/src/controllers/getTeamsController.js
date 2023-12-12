const axios = require("axios");
const { filterTeams } = require("../utils/index");
const { Team } = require("../db");

async function getAllTeams() {
  const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

  const filteredTeams = filterTeams(driversApi);

  filteredTeams.forEach(async (name) => {
    await Team.create({ name });
  });

  return filteredTeams;
}

module.exports = getAllTeams;
