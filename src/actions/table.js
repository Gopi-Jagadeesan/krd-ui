import Notifications from "react-notification-system-redux";
import { apiClient } from "../apiClient";

import {
  REQUEST_TABLE_LIST,
  RECEIVE_TABLE_LIST,
  FETCH_TABLE_LIST_FAIL,
  SET_TABLE_PAGE,
  CLEAR_TABLE_LIST
} from "./Constants";

/**
 * Request table list
 *
 * @param {*} id
 */
function requestTableList(id) {
  return { type: REQUEST_TABLE_LIST, id };
}
/**
 * Receive table list
 *
 * @param {*} id
 * @param {*} payload
 */
function receiveTableList(id, payload) {
  return { type: RECEIVE_TABLE_LIST, id, payload };
}

/**
 * Fetch table list fail
 *
 * @param {*} id
 */
function fetchTableListFail(id) {
  return { type: FETCH_TABLE_LIST_FAIL, id };
}

/**
 * Clear table list
 *
 * @param {*} id
 */
export function clearTableList(id) {
  return { type: CLEAR_TABLE_LIST, id };
}

/**
 * Set table page
 *
 * @param {*} id
 * @param {*} payload
 */
export function setTablePage(id, payload) {
  return { type: SET_TABLE_PAGE, id, payload };
}

/**
 * Fetch list
 *
 * @param {*} id
 * @param {*} apiUrl
 * @param {*} page
 * @param {*} pageSize
 * @param {*} params
 */
export function fetchList(id, apiUrl, page, pageSize, params = {}) {
  const queryString = [];
  if (page) {
    queryString.push(`page=${page}`);
  }

  if (pageSize) {
    queryString.push(`pageSize=${pageSize}`);
  }

  Object.keys(params).forEach(param => {
    queryString.push(`${param}=${params[param]}`);
  });

  apiUrl = `${apiUrl}?${queryString.join("&")}`;

  return async dispatch => {
    dispatch(requestTableList(id));

    try {
      const response = await apiClient
        .get(`${apiUrl}`);
      const list = response.data;
      dispatch(receiveTableList(id, list));
    } catch (error) {
      dispatch(fetchTableListFail(id));

      if (error.status >= 400) {
        dispatch(
          Notifications.error({
            title: `Fetch List ${id} fail`,
            message: "error",
            autoDismiss: 3
          })
        );
        throw new Error("Bad response from server");
      }
    }
  };
}
