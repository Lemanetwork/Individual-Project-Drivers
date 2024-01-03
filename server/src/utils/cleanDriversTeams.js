function cleanDriversTeams(driversDb) {
  const cleanedDrivers = driversDb.map((driver) => {
    const {
      id,
      forename,
      surname,
      Teams,
      description,
      image,
      nationality,
      dob,
    } = driver;

    let teamsCollection = [];

    Teams.forEach((teamDriver) => {
      teamsCollection.push(teamDriver.name);
    });

    teamsCollection = teamsCollection.join(", ");

    return {
      id,
      forename,
      surname,
      teams: teamsCollection,
      description,
      image,
      nationality,
      dob,
    };
  });

  return cleanedDrivers;
}

module.exports = cleanDriversTeams;
