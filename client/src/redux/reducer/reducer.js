import {
  GET_ALL,
  GET_BY_FORENAME,
  GET_BY_ID,
  GET_TEAMS,
  POST_DRIVER,
  FILTER_BY_TEAM,
  FILTER_BY_SOURCE,
  ORDER,
} from "../actions/actionTypes";

const initialState = {
  allDrivers: [],
  backupDrivers: [],
  allTeams: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        allDrivers: action.payload,
        backupDrivers: action.payload,
      };
    case GET_BY_FORENAME:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        backupDrivers: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case POST_DRIVER:
      return {
        ...state,
      };
    case FILTER_BY_TEAM:
      const driversByTeam =
        action.payload === "all"
          ? state.backupDrivers
          : state.backupDrivers.filter(
              (driver) => driver.teams && driver.teams.includes(action.payload)
            );
      return {
        ...state,
        allDrivers: [...driversByTeam],
      };
    case FILTER_BY_SOURCE:
      const driversBySource =
        action.payload === "all"
          ? state.backupDrivers
          : state.backupDrivers.filter((driver) => {
              if (action.payload === "db" && isNaN(driver.id)) return driver;
              else if (action.payload === "api" && !isNaN(driver.id))
                return driver;
            });
      return {
        ...state,
        allDrivers: [...driversBySource],
      };
    case ORDER:
      let orderedDrivers = state.allDrivers;
      if (action.payload === "ascAz") {
        orderedDrivers = state.allDrivers.sort(function (a, b) {
          if (a.forename > b.forename) {
            return 1;
          }
          if (a.forename < b.forename) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "desZa") {
        orderedDrivers = state.allDrivers.sort(function (a, b) {
          if (a.forename < b.forename) {
            return 1;
          }
          if (a.forename > b.forename) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "ascDob") {
        orderedDrivers = state.allDrivers.sort(function (a, b) {
          if (a.dob < b.dob) {
            return 1;
          }
          if (a.dob > b.dob) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "desDob") {
        orderedDrivers = state.allDrivers.sort(function (a, b) {
          if (a.dob > b.dob) {
            return 1;
          }
          if (a.dob < b.dob) {
            return -1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allDrivers: [...orderedDrivers],
      };
    default:
      return {
        ...state,
      };
  }
}
