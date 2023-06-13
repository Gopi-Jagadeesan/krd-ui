import thunk from "redux-thunk";
import rootReducer from "../../../src/reducers/index";
import { configureStore } from "@reduxjs/toolkit";

/**
 * Configure store
 */
export default function store() {
  return configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
  });
}
