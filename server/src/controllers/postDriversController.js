const { Driver } = require("../db");

async function postDriversController(
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teamId
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

  const arrayIds = teamId.split(", ");

  if (arrayIds.length === 1) await newDriver.addTeam(teamId);
  else
    arrayIds.forEach(async (id) => {
      await newDriver.addTeam(id);
    });

  return newDriver;
}

module.exports = postDriversController;
