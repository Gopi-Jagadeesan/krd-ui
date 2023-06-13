//bad request function

export function isBadRequest(error) {
  return error.response && error.response.status >= 400;
}
