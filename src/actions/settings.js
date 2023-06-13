import {
  REQUEST_SETTINGS_LIST,
  RECEIVE_SETTINGS_LIST,
  FETCH_SETTINGS_LIST_FAIL
} from "./Constants";

import { apiClient } from "../apiClient";

import { endpoints } from "../configs";

import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });

/**
 * Request for Settings list
 */
function requestSettings() {
  return {
    type: REQUEST_SETTINGS_LIST
  };
}

/**
 * Receive for Settings list
 */
function receiveSettings({ data: payload }) {
  return {
    type: RECEIVE_SETTINGS_LIST,
    payload
  };
}

/**
 * Settings list fails
 */
function fetchSettingsFail() {
  return {
    type: FETCH_SETTINGS_LIST_FAIL,
    payload: []
  };
}

/**
 * Fetch Settings
 */
export function fetchSettings() {
  return async dispatch => {
    dispatch(requestSettings());
    try {
      const response = await apiClient
        .get(`${endpoints().settingsAPI}`);
      const response_1 = response;
      dispatch(receiveSettings(response_1));
    } catch (error) {
      dispatch(fetchSettingsFail());

      if (error.status >= 400) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toastMessage.trigger({
          type: "error",
          content: errorMessage,
        });
      }
    }
  };
}
