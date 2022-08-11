import { GET_PROBLEM_ALL, GET_SINGLE_PROBLEM } from "../constant/types";

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
    case GET_SINGLE_PROBLEM:
      return {
        ...state,
        selected_problem: payload,
      };
    default:
      return state;
  }
};

export default problemReducer;
