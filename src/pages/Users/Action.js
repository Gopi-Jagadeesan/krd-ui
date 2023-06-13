//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_USER_DETAIL_FAIL,
  RECEIVE_USER_DETAIL,
  REQUEST_USER_DETAIL,
  REQUEST_CREATE_USER,
  RECEIVE_CREATE_USER,
  USER_CREATE_ERROR,
  REQUEST_DELETE_USER,
  RECEIVE_DELETE_USER,
  USER_DELETE_ERROR,
  REQUEST_UPDATE_USER,
  RECEIVE_UPDATE_USER,
  USER_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for user details
 */
function requestUserDetail() {
  return { type: REQUEST_USER_DETAIL };
}

/**
 * Get user details
 *
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive user details
 */
function receiveUserDetail(payload) {
  return { type: RECEIVE_USER_DETAIL, payload };
}

/**
 * Receive user details fail
 */
function fetchUserDetailFail(error) {
  return { type: FETCH_USER_DETAIL_FAIL, error };
}

export function fetchUserDetail() {
  return (dispatch) => {
    dispatch(requestUserDetail());

    return apiClient
      .get(`${endpoints().userAPI}`)
      .then((response) => {
        dispatch(receiveUserDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserDetailFail(error));

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
 * Request for creating User
 */
export function requestCreateUser() {
  return {
    type: REQUEST_CREATE_USER,
  };
}

/**
 * Receive for receive User
 */
export function receiveCreateUser() {
  return {
    type: RECEIVE_CREATE_USER,
  };
}

/**
 * Receive for error creating User
 */
export function userCreateError(error) {
  return {
    type: USER_CREATE_ERROR,
    error,
  };
}

/**
 * Create User
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addUser(data) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().userAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList("users", `${endpoints().userAPI}/users/search`, 1, 10)
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
        dispatch(userCreateError(error));

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
 * Request for Delete User
 */
export function requestDeleteUser() {
  return {
    type: REQUEST_DELETE_USER,
  };
}

/**
 * Receive for receive User
 */
export function receiveDeleteUser() {
  return {
    type: RECEIVE_DELETE_USER,
  };
}

/**
 * Receive for error creating User
 */
export function userDeleteError(error) {
  return {
    type: USER_DELETE_ERROR,
    error,
  };
}

/**
 * Delete User
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteUser(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().userAPI}/${id}`)
      .then((response) => {
        dispatch(
          fetchList("users", `${endpoints().userAPI}/users/search`, 1, 10)
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
        dispatch(userDeleteError(error));

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
 * Request for update User
 */
export function requestUpdateUser() {
  return {
    type: REQUEST_UPDATE_USER,
  };
}

/**
 * Receive for update User
 */
export function receiveUpdateUser() {
  return {
    type: RECEIVE_UPDATE_USER,
  };
}

/**
 * Receive for error update User
 */
export function userUpdateError(error) {
  return {
    type: USER_UPDATE_ERROR,
    error,
  };
}

/**
 * Update User
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateUser(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().userAPI}/update`, data)
      .then((response) => {
        dispatch(
          fetchList("users", `${endpoints().userAPI}/users/search`, 1, 10)
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
        dispatch(userUpdateError(error));

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
