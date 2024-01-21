import axios from "axios";
import {
  GET_ALL,
  GET_BY_FORENAME,
  GET_BY_ID,
  GET_TEAMS,
  FILTER_BY_TEAM,
  FILTER_BY_SOURCE,
  ORDER,
  CLEAR_DETAIL,
  GLOBAL_FILTER,
} from "../actions/actionTypes";

// const URL = "http://localhost:3001";
const URL = "https://server-drivers-7tos.onrender.com";

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
      return alert(error.response.data.error);
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
      // return alert(
      //   `Driver ${driverData.forename} ${driverData.surname} created successfully`
      // );
      return data;
    } catch (error) {
      return alert(error.response.data.error);
    }
  };
}

export function deleteDriver(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/drivers/${id}`);
      // return alert(`The Driver was deleted successfully`);
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

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
    payload: {},
  };
}

export function globalFilter(value) {
  return {
    type: GLOBAL_FILTER,
    payload: value,
  };
}
