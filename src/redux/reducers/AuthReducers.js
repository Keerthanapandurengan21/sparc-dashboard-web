import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/AuthType';

const initialState = {
  loading: false,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
