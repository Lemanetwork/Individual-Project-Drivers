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

  teamsFilter1 = [];

  teamsFilter2.forEach((team) => {
    teamsFilter1.push(team.trim());
  });

  const setTeams = new Set(teamsFilter1);

  teamsFilter1 = Array.from(setTeams);

  teamsFilter1.sort();

  return teamsFilter1;
}

module.exports = filterTeams;
