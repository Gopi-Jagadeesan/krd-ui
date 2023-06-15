//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_CUSTOMER_DETAIL_FAIL,
  RECEIVE_CUSTOMER_DETAIL,
  REQUEST_CUSTOMER_DETAIL,
  REQUEST_CREATE_CUSTOMER,
  RECEIVE_CREATE_CUSTOMER,
  CUSTOMER_CREATE_ERROR,
  REQUEST_DELETE_CUSTOMER,
  RECEIVE_DELETE_CUSTOMER,
  CUSTOMER_DELETE_ERROR,
  REQUEST_UPDATE_CUSTOMER,
  RECEIVE_UPDATE_CUSTOMER,
  CUSTOMER_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for customer details
 */
function requestCustomerDetail() {
  return { type: REQUEST_CUSTOMER_DETAIL };
}

/**
 * Get customer details
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive customer details
 */
function receiveCustomerDetail(payload) {
  return { type: RECEIVE_CUSTOMER_DETAIL, payload };
}

/**
 * Receive customer details fail
 */
function fetchCustomerDetailFail(error) {
  return { type: FETCH_CUSTOMER_DETAIL_FAIL, error };
}

export function fetchCustomerDetail() {
  return (dispatch) => {
    dispatch(requestCustomerDetail());

    return apiClient
      .get(`${endpoints().customersAPI}`)
      .then((response) => {
        dispatch(receiveCustomerDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchCustomerDetailFail(error));

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
 * Request for creating Customer
 */
export function requestCreateCustomer() {
  return {
    type: REQUEST_CREATE_CUSTOMER,
  };
}

/**
 * Receive for receive Customer
 */
export function receiveCreateCustomer() {
  return {
    type: RECEIVE_CREATE_CUSTOMER,
  };
}

/**
 * Receive for error creating Customer
 */
export function customerCreateError(error) {
  return {
    type: CUSTOMER_CREATE_ERROR,
    error,
  };
}

/**
 * Create Customer
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addCustomer(data, history) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().customersAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList("customer", `${endpoints().customersAPI}/search`, 1, 10)
        );
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          toastMessage.trigger({
            type: "success",
            content: successMessage,
          });
          console.log("response.data.id =====>", response.data.id);
          history.push(
            `customers/details/${response && response.data && response.data.id}`
          );
        }
      })
      .catch((error) => {
        dispatch(customerCreateError(error));

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
 * Request for Delete Customer
 */
export function requestDeleteCustomer() {
  return {
    type: REQUEST_DELETE_CUSTOMER,
  };
}

/**
 * Receive for receive Customer
 */
export function receiveDeleteCustomer() {
  return {
    type: RECEIVE_DELETE_CUSTOMER,
  };
}

/**
 * Receive for error creating Customer
 */
export function customerDeleteError(error) {
  return {
    type: CUSTOMER_DELETE_ERROR,
    error,
  };
}

/**
 * Delete Customer
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deleteCustomer(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().customersAPI}/${id}`)
      .then((response) => {
        dispatch(
          fetchList("customer", `${endpoints().customersAPI}/search`, 1, 10)
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
        dispatch(customerDeleteError(error));

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
 * Request for update Customer
 */
export function requestUpdateCustomer() {
  return {
    type: REQUEST_UPDATE_CUSTOMER,
  };
}

/**
 * Receive for update Customer
 */
export function receiveUpdateCustomer() {
  return {
    type: RECEIVE_UPDATE_CUSTOMER,
  };
}

/**
 * Receive for error update Customer
 */
export function customerUpdateError(error) {
  return {
    type: CUSTOMER_UPDATE_ERROR,
    error,
  };
}

/**
 * Update Customer
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updateCustomer(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().customersAPI}/update`, data)
      .then((response) => {
        dispatch(
          fetchList("customer", `${endpoints().customersAPI}/search`, 1, 10)
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
        dispatch(customerUpdateError(error));

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
