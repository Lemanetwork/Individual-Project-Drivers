function balanceDriversInfo(driversApi) {
  const balancedDrivers = driversApi.map((driver) => ({
    id: driver.id,
    forename: driver.name.forename,
    surname: driver.name.surname,
    teams: driver.teams,
    description: driver.description,
    image: driver.image.url
      ? driver.image.url
      : "https://img.freepik.com/premium-photo/man-racing-suit-stands-front-blurry-background_901003-10316.jpg",
    nationality: driver.nationality,
    dob: driver.dob,
  }));

  return balancedDrivers;
}

module.exports = balanceDriversInfo;
