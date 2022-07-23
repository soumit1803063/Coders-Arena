import { combineReducers } from "redux";
import counterReducer from "./auth.reducer";

export default combineReducers({
  auth: counterReducer,
});
