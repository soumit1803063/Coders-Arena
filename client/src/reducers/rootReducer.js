import { combineReducers } from "redux";
import counterReducer from "./auth.reducer";
import commentReducer from "./comment.reducer";
import groupReducer from "./group.reducer";
import problemReducer from "./problem.reducer";
import memberReducer from "./member.reducer";
export default combineReducers({
  auth: counterReducer,
  group: groupReducer,
  problem: problemReducer,
  comment: commentReducer,
  member: memberReducer,
});
