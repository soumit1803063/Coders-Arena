import { GET_GROUPS_OF_AUTH_USER_SUCCESS } from "../constant/types";

const initialState = {
  groups: null,
};

const groupReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS_OF_AUTH_USER_SUCCESS:
      return {
        ...state,
        groups: payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
