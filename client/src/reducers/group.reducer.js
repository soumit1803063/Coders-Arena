import {
  GET_GROUPS_OF_AUTH_USER_SUCCESS,
  GET_SEARCHED_GROUPS,
} from "../constant/types";

const initialState = {
  groups: null,
  searched_groups: null,
};

const groupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS_OF_AUTH_USER_SUCCESS:
      return {
        ...state,
        groups: payload,
      };
    case GET_SEARCHED_GROUPS:
      return {
        ...state,
        searched_groups: payload,
      };

    default:
      return state;
  }
};

export default groupReducer;
