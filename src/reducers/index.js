import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";

// Reducer
import { userReducer } from "./userReducer";
import table from "./table";
import { settingsReducer } from "./settingsReducer";

const appReducer = combineReducers({
  routing: routerReducer,
  table,
  form,
  user: userReducer,
  settings: settingsReducer
});

const rootReducer = (state, action) => {
  if (action.type === "UNAUTH_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
