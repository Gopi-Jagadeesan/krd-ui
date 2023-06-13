import {
  REQUEST_USER_DETAIL,
  RECEIVE_USER_DETAIL,
  FETCH_USER_DETAIL_FAIL
} from "../actions/Constants";

// User reducer actions
export function userReducer(
  state = {
    isFetching: false
  },
  action
) {
  // Action types
  switch (action.type) {
    case REQUEST_USER_DETAIL:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_USER_DETAIL: {
      return Object.assign({}, state, { isFetching: false }, action.payload);
    }
    case FETCH_USER_DETAIL_FAIL: {
      return { ...state, isFetching: false };
    }
    default:
      return state;
  }
}
