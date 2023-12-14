function filterDrivers(driversApi, forename) {
  forename =
    forename.charAt(0).toUpperCase() + forename.substring(1).toLowerCase();
  let filteredDrivers = driversApi.filter(
    (driver) => driver.name.forename === forename
  );

  return filteredDrivers;
}

module.exports = filterDrivers;
