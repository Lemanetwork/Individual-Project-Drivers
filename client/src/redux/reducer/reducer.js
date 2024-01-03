import {
  GET_ALL,
  GET_BY_FORENAME,
  GET_BY_ID,
  GET_TEAMS,
  POST_DRIVER,
  DELETE_DRIVER,
  FILTER_BY_TEAM,
  FILTER_BY_SOURCE,
  ORDER,
  CLEAR_DETAIL,
  GLOBAL_FILTER,
} from "../actions/actionTypes";

const initialState = {
  globalFilter: true,
  driverDetail: [],
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
        driverDetail: action.payload,
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
    case DELETE_DRIVER:
      return {
        ...state,
      };
    case FILTER_BY_TEAM:
      const dataByTeam = state.globalFilter
        ? state.backupDrivers
        : state.allDrivers;
      const driversByTeam =
        action.payload === "all"
          ? state.backupDrivers
          : dataByTeam.filter(
              (driver) => driver.teams && driver.teams.includes(action.payload)
            );
      return {
        ...state,
        allDrivers: [...driversByTeam],
      };
    case FILTER_BY_SOURCE:
      const dataBySource = state.globalFilter
        ? state.backupDrivers
        : state.allDrivers;
      const driversBySource =
        action.payload === "all"
          ? state.backupDrivers
          : dataBySource.filter((driver) => {
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
    case CLEAR_DETAIL:
      return {
        ...state,
        driverDetail: action.payload,
      };
    case GLOBAL_FILTER:
      return {
        ...state,
        globalFilter: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
