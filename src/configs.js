const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = () => ({
  userAPI: appApi("v1/user"),
  settingsAPI: appApi("v1/settings"),
  rentalsAPI: appApi("v1/rentals"),
  vehiclesAPI: appApi("v1/vehicles"),
  rolesAPI: appApi("v1/sysroles"),
  customersAPI: appApi("v1/customers"),
  dashboardAPI: appApi("v1/dashboard"),
});

// Default API Key
export const DEFAULT_API_KEY = process.env.REACT_APP_DEFAULT_API_KEY || "";

export const API_URL = process.env.REACT_APP_API_URL;
