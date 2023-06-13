import {
  REQUEST_TABLE_LIST,
  RECEIVE_TABLE_LIST,
  FETCH_TABLE_LIST_FAIL,
  SET_TABLE_PAGE,
  CLEAR_TABLE_LIST
} from "../actions/Constants";

export default (state = {}, action) => {
  const { id, payload, type } = action;
  switch (type) {
    // Clear table list
    case CLEAR_TABLE_LIST: {
      delete state[id];
      return state;
    }
    // Request table list
    case REQUEST_TABLE_LIST:
      return {
        ...state,
        [id]: Object.assign({}, state[id], { isFetching: true })
      };
    // Recieve table list
    case RECEIVE_TABLE_LIST:
      return {
        ...state,
        [id]: Object.assign({}, state[id], {
          isFetching: false,
          currentPage: payload.currentPage,
          totalCount: payload.totalCount,
          pageSize: payload.pageSize,
          [payload.currentPage]: payload.data,
          sortList: Object.assign({}, state[id].sortList, {
            [payload.currentPage]: payload.sort
          }),
          sortDirList: Object.assign({}, state[id].sortDirList, {
            [payload.currentPage]: payload.sortDir
          }),
          sort: payload.sort,
          sortDir: payload.sortDir
        })
      };
    // Set table page
    case SET_TABLE_PAGE:
      return {
        ...state,
        [id]: Object.assign({}, state[id], {
          currentPage: payload
        })
      };
    // Fetch table list error
    case FETCH_TABLE_LIST_FAIL:
      return {
        ...state,
        [id]: Object.assign({}, state[id], { isFetching: false })
      };
    default:
      return state;
  }
};
