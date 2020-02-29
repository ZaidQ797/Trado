import {AUTH_FAILED, AUTH_LOADING} from '../actions/auth';
import {LOGIN_SUCCESS} from '../types';

const initialState = {
  authenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errMsg: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        errMsg: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errMsg: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
  }
};
