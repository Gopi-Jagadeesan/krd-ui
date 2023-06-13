//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_ROLE_DETAIL_FAIL,
  RECEIVE_ROLE_DETAIL,
  REQUEST_ROLE_DETAIL,
  REQUEST_CREATE_ROLE,
  RECEIVE_CREATE_ROLE,
  ROLE_CREATE_ERROR,
  REQUEST_DELETE_ROLE,
  RECEIVE_DELETE_ROLE,
  ROLE_DELETE_ERROR,
  REQUEST_UPDATE_ROLE,
  RECEIVE_UPDATE_ROLE,
  ROLE_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for role details
 */
function requestRoleDetail() {
  return { type: REQUEST_ROLE_DETAIL };
}

/**
 * Get role details
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive role details
 */
function receiveRoleDetail(payload) {
  return { type: RECEIVE_ROLE_DETAIL, payload };
}

/**
 * Receive role details fail
 */
function fetchRoleDetailFail(error) {
  return { type: FETCH_ROLE_DETAIL_FAIL, error };
}

export function fetchRoleDetail() {
  return (dispatch) => {
    dispatch(requestRoleDetail());

    return apiClient
      .get(`${endpoints().rolesAPI}`)
      .then((response) => {
        dispatch(receiveRoleDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchRoleDetailFail(error));

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
 * Request for creating Role
 */
export function requestCreateRole() {
  return {
    type: REQUEST_CREATE_ROLE,
  };
}

/**
 * Receive for receive Role
 */
export function receiveCreateRole() {
  return {
    type: RECEIVE_CREATE_ROLE,
  };
}

/**
 * Receive for error creating Role
 */
export function roleCreateError(error) {
  return {
    type: ROLE_CREATE_ERROR,
    error,
  };
}

/**
 * Create Role
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addRole(data) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().rolesAPI}`, data)
      .then((response) => {
        dispatch(fetchList("role", `${endpoints().rolesAPI}/search`, 1, 10));
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
        dispatch(roleCreateError(error));

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
 * Request for Delete Role
 */
export function requestDeleteRole() {
  return {
    type: REQUEST_DELETE_ROLE,
  };
}

/**
 * Receive for receive Role
 */
export function receiveDeleteRole() {
  return {
    type: RECEIVE_DELETE_ROLE,
  };
}

/**
 * Receive for error creating Role
 */
export function roleDeleteError(error) {
  return {
    type: ROLE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Role
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteRole(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().rolesAPI}/${id}`)
      .then((response) => {
        dispatch(fetchList("role", `${endpoints().rolesAPI}/search`, 1, 10));
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
        dispatch(roleDeleteError(error));

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
 * Request for update Role
 */
export function requestUpdateRole() {
  return {
    type: REQUEST_UPDATE_ROLE,
  };
}

/**
 * Receive for update Role
 */
export function receiveUpdateRole() {
  return {
    type: RECEIVE_UPDATE_ROLE,
  };
}

/**
 * Receive for error update Role
 */
export function roleUpdateError(error) {
  return {
    type: ROLE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Role
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateRole(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().rolesAPI}/update`, data)
      .then((response) => {
        dispatch(fetchList("role", `${endpoints().rolesAPI}/search`, 1, 10));
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
        dispatch(roleUpdateError(error));

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
