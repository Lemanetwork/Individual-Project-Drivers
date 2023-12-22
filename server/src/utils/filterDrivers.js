function filterDrivers(driversApi, forename) {
  let filteredDrivers = driversApi.filter(
    (driver) => driver.name.forename === forename
  );

  return filteredDrivers;
}

module.exports = filterDrivers;
