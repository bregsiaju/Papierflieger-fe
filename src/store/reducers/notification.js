import { GET_NOTIF, COUNT_NOTIF,  } from "../types/index";

const initialState = {
  message: false,
  data: [],
  loading: false,
  errorMessage: false,
};

const notifReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIF:
      return {
        ...state,
        data: payload.data,
        loading: payload.loading,
        errorMessage: payload.errorMessage,
      };
    case COUNT_NOTIF:
      return {
        ...state,
        data: payload.data,
        loading: payload.loading,
        errorMessage: payload.errorMessage,
      };
    default: {
      return state;
    }
  }
};

export default notifReducer;
