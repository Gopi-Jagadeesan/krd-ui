import { clearCookie } from "./helper";

// Cookies
export const COOKIE_SESSION_TOKEN = "session_token";
export const COOKIE_USER_ID = "userId";
export const COOKIE_ROLE = "role";
export const COOKIE_PORTAL_NAME = "portalName";

/**
 * Clear all cookies
 *
 */
export function clearAllCookies() {
  clearCookie(COOKIE_SESSION_TOKEN);
  clearCookie(COOKIE_ROLE);
  clearCookie(COOKIE_USER_ID);
  window.localStorage.clear();
  return "";
}
