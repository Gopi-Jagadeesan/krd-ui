import {
  REQUEST_SETTINGS_LIST,
  RECEIVE_SETTINGS_LIST,
  FETCH_SETTINGS_LIST_FAIL
} from "../actions/Constants";

export function settingsReducer(
  state = {
    isFetching: true
  },
  action
) {
  // Request Settings
  switch (action.type) {
    case REQUEST_SETTINGS_LIST:
      return Object.assign({}, state, {
        isFetching: true
      });
    // Receive Settings
    case RECEIVE_SETTINGS_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        settings: action.payload
      });
    // Fetch Settings fail
    case FETCH_SETTINGS_LIST_FAIL: {
      return {
        ...state,
        settings: state.settings ? state.settings : action.payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
}
