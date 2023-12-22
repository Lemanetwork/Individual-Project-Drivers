import axios from "axios";
import {
  GET_ALL,
  GET_BY_FORENAME,
  GET_BY_ID,
  GET_TEAMS,
  FILTER_BY_TEAM,
  FILTER_BY_SOURCE,
  ORDER,
} from "../actions/actionTypes";

const URL = "http://localhost:3001";

export function getAllDrivers() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/drivers/`);
      return dispatch({
        type: GET_ALL,
        payload: data,
      });
    } catch (error) {
      return console.error(error.message);
    }
  };
}

export function getDriversByName(forename) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/drivers/?forename=${forename}`);
      return dispatch({
        type: GET_BY_FORENAME,
        payload: data,
      });
    } catch (error) {
      return console.error(error.message);
    }
  };
}

export function getDriverDetailById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/drivers/${id}`);
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      return console.error(error.message);
    }
  };
}

export function getTeams() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/teams`);
      return dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    } catch (error) {
      return console.error(error.message);
    }
  };
}

export function postDriver(driverData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/posts`, driverData);
      return data;
    } catch (error) {
      return console.error(error.message);
    }
  };
}

export function filterDriversByTeam(team) {
  return {
    type: FILTER_BY_TEAM,
    payload: team,
  };
}

export function filterDriversBySource(source) {
  return {
    type: FILTER_BY_SOURCE,
    payload: source,
  };
}

export function orderDrivers(order) {
  return {
    type: ORDER,
    payload: order,
  };
}
