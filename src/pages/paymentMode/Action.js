//API
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";

//Common
import { isBadRequest } from "../../common/http";
import {
  FETCH_PAYMENT_MODE_DETAIL_FAIL,
  RECEIVE_PAYMENT_MODE_DETAIL,
  REQUEST_PAYMENT_MODE_DETAIL,
  REQUEST_CREATE_PAYMENT_MODE,
  RECEIVE_CREATE_PAYMENT_MODE,
  PAYMENT_MODE_CREATE_ERROR,
  REQUEST_DELETE_PAYMENT_MODE,
  RECEIVE_DELETE_PAYMENT_MODE,
  PAYMENT_MODE_DELETE_ERROR,
  REQUEST_UPDATE_PAYMENT_MODE,
  RECEIVE_UPDATE_PAYMENT_MODE,
  PAYMENT_MODE_UPDATE_ERROR,
} from "./Constant";
import { fetchList } from "../../actions/table";
import { ToastController } from "@freshworks/crayons/react";

// Initialize toast message
const toastMessage = ToastController({ position: "top-center" });
/**
 * Request for paymentMode details
 */
function requestPaymentModeDetail() {
  return { type: REQUEST_PAYMENT_MODE_DETAIL };
}

/**
 * Get paymentMode details
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */

/**
 * Receive paymentMode details
 */
function receivePaymentModeDetail(payload) {
  return { type: RECEIVE_PAYMENT_MODE_DETAIL, payload };
}

/**
 * Receive paymentMode details fail
 */
function fetchPaymentModeDetailFail(error) {
  return { type: FETCH_PAYMENT_MODE_DETAIL_FAIL, error };
}

export function fetchPaymentModeDetail() {
  return (dispatch) => {
    dispatch(requestPaymentModeDetail());

    return apiClient
      .get(`${endpoints().paymentModeAPI}`)
      .then((response) => {
        dispatch(receivePaymentModeDetail(response.data));
      })
      .catch((error) => {
        dispatch(fetchPaymentModeDetailFail(error));

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
 * Request for creating PaymentMode
 */
export function requestCreatePaymentMode() {
  return {
    type: REQUEST_CREATE_PAYMENT_MODE,
  };
}

/**
 * Receive for receive PaymentMode
 */
export function receiveCreatePaymentMode() {
  return {
    type: RECEIVE_CREATE_PAYMENT_MODE,
  };
}

/**
 * Receive for error creating PaymentMode
 */
export function paymentModeCreateError(error) {
  return {
    type: PAYMENT_MODE_CREATE_ERROR,
    error,
  };
}

/**
 * Create PaymentMode
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addPaymentMode(data) {
  return (dispatch) => {
    return apiClient
      .post(`${endpoints().paymentModeAPI}`, data)
      .then((response) => {
        dispatch(
          fetchList(
            "paymentMode",
            `${endpoints().paymentModeAPI}/search`,
            1,
            10
          )
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
        dispatch(paymentModeCreateError(error));

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
 * Request for Delete PaymentMode
 */
export function requestDeletePaymentMode() {
  return {
    type: REQUEST_DELETE_PAYMENT_MODE,
  };
}

/**
 * Receive for receive PaymentMode
 */
export function receiveDeletePaymentMode() {
  return {
    type: RECEIVE_DELETE_PAYMENT_MODE,
  };
}

/**
 * Receive for error creating PaymentMode
 */
export function paymentModeDeleteError(error) {
  return {
    type: PAYMENT_MODE_DELETE_ERROR,
    error,
  };
}

/**
 * Delete PaymentMode
 *
 * @param id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function deletePaymentMode(id) {
  return (dispatch) => {
    return apiClient
      .delete(`${endpoints().paymentModeAPI}/${id}`)
      .then((response) => {
        dispatch(
          fetchList(
            "paymentMode",
            `${endpoints().paymentModeAPI}/search`,
            1,
            10
          )
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
        dispatch(paymentModeDeleteError(error));

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
 * Request for update PaymentMode
 */
export function requestUpdatePaymentMode() {
  return {
    type: REQUEST_UPDATE_PAYMENT_MODE,
  };
}

/**
 * Receive for update PaymentMode
 */
export function receiveUpdatePaymentMode() {
  return {
    type: RECEIVE_UPDATE_PAYMENT_MODE,
  };
}

/**
 * Receive for error update PaymentMode
 */
export function paymentModeUpdateError(error) {
  return {
    type: PAYMENT_MODE_UPDATE_ERROR,
    error,
  };
}

/**
 * Update PaymentMode
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function updatePaymentMode(data) {
  return (dispatch) => {
    return apiClient
      .put(`${endpoints().paymentModeAPI}/update`, data)
      .then((response) => {
        dispatch(
          fetchList(
            "paymentMode",
            `${endpoints().paymentModeAPI}/search`,
            1,
            10
          )
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
        dispatch(paymentModeUpdateError(error));

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
