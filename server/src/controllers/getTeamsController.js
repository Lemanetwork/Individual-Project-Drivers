const { Team } = require("../db");
const axios = require("axios");
const filterTeams = require("../utils/filterTeams");

async function getAllTeams() {
  const teamsDb = await Team.findAll();

  if (teamsDb.length === 0) {
    const driversApi = (await axios.get(`http://localhost:5000/drivers/`)).data;

    const filteredTeams = filterTeams(driversApi);

    filteredTeams.forEach(async (name) => {
      await Team.create({ name });
    });

    return filteredTeams;
  } else {
    let allTeamsDb = [];

    teamsDb.forEach((team) => {
      allTeamsDb.push(team.name);
    });

    return allTeamsDb;
  }
}

module.exports = getAllTeams;
