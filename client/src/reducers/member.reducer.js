import { GET_MEMBERS, GET_MEMBER_REQUESTS } from "../constant/types";

const initialState = {
  members: null,
  member_requests: null,
};

const memberReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: payload,
      };
    case GET_MEMBER_REQUESTS:
      return {
        ...state,
        member_requests: payload,
      };

    default:
      return state;
  }
};

export default memberReducer;
