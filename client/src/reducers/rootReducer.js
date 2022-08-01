import { combineReducers } from "redux";
import counterReducer from "./auth.reducer";
import groupReducer from "./group.reducer";
import problemReducer from "./problem.reducer";

export default combineReducers({
  auth: counterReducer,
  group: groupReducer,
  problem: problemReducer,
});
