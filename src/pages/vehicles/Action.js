//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_VEHICLES_DETAIL_FAIL,
  RECEIVE_VEHICLES_DETAIL,
  REQUEST_VEHICLES_DETAIL,
  REQUEST_CREATE_VEHICLES,
  RECEIVE_CREATE_VEHICLES,
  VEHICLES_CREATE_ERROR,
  REQUEST_DELETE_VEHICLES,
  RECEIVE_DELETE_VEHICLES,
  VEHICLES_DELETE_ERROR,
  REQUEST_UPDATE_VEHICLES,
  RECEIVE_UPDATE_VEHICLES,
  VEHICLES_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons/react";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for vehicles details
 */
function requestVehiclesDetail() {
  return { type: REQUEST_VEHICLES_DETAIL };
}

/**
 * Get vehicles details
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive vehicles details
 */
function receiveVehiclesDetail(payload) {
  return { type: RECEIVE_VEHICLES_DETAIL, payload };
}

/**
 * Receive vehicles details fail
 */
function fetchVehiclesDetailFail(error) {
  return { type: FETCH_VEHICLES_DETAIL_FAIL, error };
}

export function fetchVehiclesDetail() {
  return (dispatch) => {
    dispatch(requestVehiclesDetail());

    return apiClient
      .get(`${endpoints().vehiclesAPI}`)
      .then((response) => {
        dispatch(receiveVehiclesDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchVehiclesDetailFail(error));

        if (isBadRequest(error)) {
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
      });
  };
}

/**
 * Request for creating Vehicles
 */
export function requestCreateVehicles() {
  return {
    type: REQUEST_CREATE_VEHICLES,
  };
}

/**
 * Receive for receive Vehicles
 */
export function receiveCreateVehicles() {
  return {
    type: RECEIVE_CREATE_VEHICLES,
  };
}

/**
 * Receive for error creating Vehicles
 */
export function vehiclesCreateError(error) {
  return {
    type: VEHICLES_CREATE_ERROR,
    error,
  };
}

/**
 * Create Vehicles
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addVehicles(data) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().vehiclesAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList("vehicles", `${endpoints().vehiclesAPI}/search`, 1, 10)
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toastMessage.trigger({
            type: "success",
            content: successMessage,
          });
        }
      })
      .catch((error) => {
        dispatch(vehiclesCreateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toastMessage.trigger({
            type: "error",
            content: errorMessage,
          });
          console.error(errorMessage);
        }
      });
  };
}

/**
 * Request for Delete Vehicles
 */
export function requestDeleteVehicles() {
  return {
    type: REQUEST_DELETE_VEHICLES,
  };
}

/**
 * Receive for receive Vehicles
 */
export function receiveDeleteVehicles() {
  return {
    type: RECEIVE_DELETE_VEHICLES,
  };
}

/**
 * Receive for error creating Vehicles
 */
export function vehiclesDeleteError(error) {
  return {
    type: VEHICLES_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Vehicles
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteVehicles(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().vehiclesAPI}/${id}`)
      .then((response) => {
        dispatch(
          fetchList("vehicles", `${endpoints().vehiclesAPI}/search`, 1, 10)
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toastMessage.trigger({
            type: "success",
            content: successMessage,
          });
        }
      })
      .catch((error) => {
        dispatch(vehiclesDeleteError(error));

        if (isBadRequest(error)) {
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
      });
  };
}

/**
 * Request for update Vehicles
 */
export function requestUpdateVehicles() {
  return {
    type: REQUEST_UPDATE_VEHICLES,
  };
}

/**
 * Receive for update Vehicles
 */
export function receiveUpdateVehicles() {
  return {
    type: RECEIVE_UPDATE_VEHICLES,
  };
}

/**
 * Receive for error update Vehicles
 */
export function vehiclesUpdateError(error) {
  return {
    type: VEHICLES_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Vehicles
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateVehicles(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().vehiclesAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList("vehicles", `${endpoints().vehiclesAPI}/search`, 1, 10)
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toastMessage.trigger({
            type: "success",
            content: successMessage,
          });
        }
      })
      .catch((error) => {
        dispatch(vehiclesUpdateError(error));

        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toastMessage.trigger({
            type: "error",
            content: errorMessage,
          });
          console.error(errorMessage);
        }
      });
  };
}
