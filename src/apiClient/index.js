import axios from "axios";

// Configs
import { API_URL } from "../config/Constants";

// Helper
import { getCookie } from "../lib/helper";

// Cookie
import { COOKIE_SESSION_TOKEN } from "../lib/cookie";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    common: {
      //set token for authorization
      Authorization: getCookie(COOKIE_SESSION_TOKEN),
    },
  },
});

export function get(url, callback) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie(COOKIE_SESSION_TOKEN),
      Pragma: "no-cache",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
}
