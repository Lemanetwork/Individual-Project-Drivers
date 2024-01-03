function filterDriversByName(driversApi, forename) {
  let filteredDrivers = driversApi.filter(
    (driver) => driver.name.forename === forename
  );
  return filteredDrivers;
}

module.exports = filterDriversByName;
