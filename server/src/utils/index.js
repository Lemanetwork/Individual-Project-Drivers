function balanceInfo(driversApi) {
  const balancedDrivers = driversApi.map((driver) => ({
    id: driver.id,
    forename: driver.name.forename,
    surname: driver.name.surname,
    description: driver.description,
    image: driver.image
      ? driver.image.url
      : "https://img.freepik.com/premium-photo/man-racing-suit-stands-front-blurry-background_901003-10316.jpg",
    nationality: driver.nationality,
    dob: driver.dob,
  }));

  return balancedDrivers;
}

function filterDrivers(driversApi, forename) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  let filteredDrivers = driversApi.filter(
    (driver) => driver.name.forename === forename
  );

  return filteredDrivers;
}

function filterTeams(driversApi) {
  let teamsFilter1 = [];
  let teamsFilter2 = [];

  driversApi.forEach((driver) => {
    let teamsString = driver.teams ? driver.teams : null;

    if (teamsString)
      teamsFilter1 = [...teamsFilter1, ...teamsString.split(", ")];
  });

  teamsFilter1.forEach((team) => {
    teamsFilter2 = [...teamsFilter2, ...team.split(",")];
  });

  const setTeams = new Set(teamsFilter2);

  teamsFilter2 = Array.from(setTeams);

  return teamsFilter2;
}

module.exports = {
  balanceInfo,
  filterDrivers,
  filterTeams,
};
