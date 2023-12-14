const { Driver } = require("../db");
const associateDriversTeams = require("../utils/associateDriversTeams");

async function postDriversController(
  forename,
  surname,
  teams,
  description,
  image,
  nationality,
  dob
) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  const newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  associateDriversTeams(newDriver, teams);

  return {
    id: newDriver.id,
    forename,
    surname,
    teams,
    description,
    image,
    nationality,
    dob,
  };
}

module.exports = postDriversController;
