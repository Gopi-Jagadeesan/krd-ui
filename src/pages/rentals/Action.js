//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_RENTALS_DETAIL_FAIL,
  RECEIVE_RENTALS_DETAIL,
  REQUEST_RENTALS_DETAIL,
  REQUEST_CREATE_RENTALS,
  RECEIVE_CREATE_RENTALS,
  RENTALS_CREATE_ERROR,
  REQUEST_DELETE_RENTALS,
  RECEIVE_DELETE_RENTALS,
  RENTALS_DELETE_ERROR,
  REQUEST_UPDATE_RENTALS,
  RECEIVE_UPDATE_RENTALS,
  RENTALS_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for rentals details
 */
function requestRentalsDetail() {
  return { type: REQUEST_RENTALS_DETAIL };
}

/**
 * Get rentals details
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive rentals details
 */
function receiveRentalsDetail(payload) {
  return { type: RECEIVE_RENTALS_DETAIL, payload };
}

/**
 * Receive rentals details fail
 */
function fetchRentalsDetailFail(error) {
  return { type: FETCH_RENTALS_DETAIL_FAIL, error };
}

export function fetchRentalsDetail() {
  return (dispatch) => {
    dispatch(requestRentalsDetail());

    return apiClient
      .get(`${endpoints().rentalsAPI}`)
      .then((response) => {
        dispatch(receiveRentalsDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchRentalsDetailFail(error));

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
 * Request for creating Rentals
 */
export function requestCreateRentals() {
  return {
    type: REQUEST_CREATE_RENTALS,
  };
}

/**
 * Receive for receive Rentals
 */
export function receiveCreateRentals() {
  return {
    type: RECEIVE_CREATE_RENTALS,
  };
}

/**
 * Receive for error creating Rentals
 */
export function rentalsCreateError(error) {
  return {
    type: RENTALS_CREATE_ERROR,
    error,
  };
}

/**
 * Create Rentals
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addRentals(data) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().rentalsAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList("rentals", `${endpoints().rentalsAPI}/search`, 1, 10)
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toastMessage.trigger({
            type: "success",
            content: successMessage,
          });
          // history.push(
          //   `rentalss/details/${response && response.data && response.data.id}`
          // );
        }
      })
      .catch((error) => {
        dispatch(rentalsCreateError(error));

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
 * Request for Delete Rentals
 */
export function requestDeleteRentals() {
  return {
    type: REQUEST_DELETE_RENTALS,
  };
}

/**
 * Receive for receive Rentals
 */
export function receiveDeleteRentals() {
  return {
    type: RECEIVE_DELETE_RENTALS,
  };
}

/**
 * Receive for error creating Rentals
 */
export function rentalsDeleteError(error) {
  return {
    type: RENTALS_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Rentals
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteRentals(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().rentalsAPI}/${id}`)
      .then((response) => {
        dispatch(
          fetchList("rentals", `${endpoints().rentalsAPI}/search`, 1, 10)
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
        dispatch(rentalsDeleteError(error));

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
 * Request for update Rentals
 */
export function requestUpdateRentals() {
  return {
    type: REQUEST_UPDATE_RENTALS,
  };
}

/**
 * Receive for update Rentals
 */
export function receiveUpdateRentals() {
  return {
    type: RECEIVE_UPDATE_RENTALS,
  };
}

/**
 * Receive for error update Rentals
 */
export function rentalsUpdateError(error) {
  return {
    type: RENTALS_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Rentals
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function closeRentals(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().rentalsAPI}/close`, data)
      .then((response) => {
        dispatch(
          fetchList("rentals", `${endpoints().rentalsAPI}/search`, 1, 10)
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
        dispatch(rentalsUpdateError(error));

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
