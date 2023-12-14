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

  teamsFilter2.sort();

  return teamsFilter2;
}

module.exports = filterTeams;
