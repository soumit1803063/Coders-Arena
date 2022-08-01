import {
  GET_GROUPS_OF_AUTH_USER_SUCCESS,
  GET_PROBLEM_ALL,
} from "../constant/types";

const initialState = {
  problems: null,
  selected_problem: null,
};

const problemReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROBLEM_ALL:
      return {
        ...state,
        problems: payload,
      };
    default:
      return state;
  }
};

export default problemReducer;
