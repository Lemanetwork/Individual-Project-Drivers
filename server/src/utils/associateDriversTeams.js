const { Team } = require("../db");

async function associateDriversTeams(newDriver, teams) {
  if (teams.length === 1) {
    const driverTeam = await Team.findOne({ where: { name: teams } });
    await newDriver.addTeam(driverTeam.id);
  } else {
    teams.forEach(async (team) => {
      const driverTeam = await Team.findOne({ where: { name: team } });
      await newDriver.addTeam(driverTeam.id);
    });
  }
}

module.exports = associateDriversTeams;
