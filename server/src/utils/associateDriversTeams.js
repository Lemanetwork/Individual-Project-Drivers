const { Team } = require("../db");

async function associateDriversTeams(newDriver, teams) {
  teams.forEach(async (team) => {
    const driverTeam = await Team.findOne({ where: { name: team } });
    await newDriver.addTeam(driverTeam.id);
  });
}

module.exports = associateDriversTeams;
