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
  return async (dispatch) => {
    dispatch(requestSettings());
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, 30000); // 30 seconds timeout
      });

      // Combine the timeout promise with the actual API request
      const response = await Promise.race([
        timeoutPromise,
        apiClient.get(`${endpoints().settingsAPI}`),
      ]);

      const response_1 = response;
      dispatch(receiveSettings(response_1));
    } catch (error) {
      dispatch(fetchSettingsFail());

      if (error.message === 'Request timed out') {
        toastMessage.trigger({
          type: 'error',
          content: 'Request timed out. Please try again.',
        });
      } else if (error.status >= 400) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toastMessage.trigger({
          type: 'error',
          content: errorMessage,
        });
      }
    }
  };
}

