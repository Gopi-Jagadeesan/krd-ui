import { COOKIE_SESSION_TOKEN } from "./cookie";

/**
 * Get value by object key
 *
 * @param {*} data
 * @param {*} keyValue
 */
export const getKeyValueByObject = (data, keyValue) => {
  if (!data.length) {
    return "";
  }

  let defaultValue = "";
  Object.keys(data).forEach(function (key) {
    var value = data[key];
    if (keyValue === value.name) {
      defaultValue = value.value;
    }
  });

  return defaultValue;
};

/**
 * Get Current Year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Get params by name
 */
export function getParamsByName(e) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(e);
}

/**
 * Get Cookie
 *
 * @param cname
 * @returns {string}
 */
export function getCookie(cname) {
  var nameEQ = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

/**
 * Set Cookie
 *
 * @param cookieName
 * @param cookieValue
 * @param days
 */
export function setCookie(cookieName, cookieValue, days = 1) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
}

/**
 * Clear Cookie
 *
 * @param name
 */
export function clearCookie(name) {
  setCookie(name, "", -24);
}

/**
 * Get Url Parameter

 * @param name
 */
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : name === "email"
      ? decodeURIComponent(results[1])
      : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Is data Empty
 * @param data
 */
export const isEmpty = (data) => {
  if (data && data.length > 0) {
    return true;
  } else return null;
};

/**
 * Is data Empty
 * @param data
 */
export const isNotEmpty = (string) => {
  if (string != 0) {
    return true;
  } else return null;
};

/**
 * Is LoggedIn user
 *
 * @param name
 */
export function isLoggedIn() {
  let currentPath = window.location.pathname;
  let redirectUrl = "";
  if (currentPath) {
    if (currentPath === "/login") {
      currentPath = "/dashboard";
    }
    redirectUrl = `?redirect=${currentPath}`;
  }

  if (!getCookie(COOKIE_SESSION_TOKEN) && !currentPath.includes("/login")) {
    // if session_token is null redirect login
    window.location.replace(`/login${redirectUrl}`);
  } else if (currentPath !== "/dashboard") {
    window.location.replace(`/dashboard`);
  }
}

/**
 * To String
 *
 * @param {*} value
 */
export function toString(value) {
  return value ? value : null;
}
