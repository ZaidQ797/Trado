import {LOGIN_SUCCESS} from '../types';
import firebaseService from '../../service/firebase';

export const AUTH_LOADING = 'auth_loading';
export const AUTH_FAILED = 'auth_failed';

export const loginUser = (email, pass) => {
  return async dispatch => {
    dispatch(authLoading());
    try {
      const res = await firebaseService
        .auth()
        .signInWithEmailAndPassword(email, pass);
      if (res) {
        dispatch(loginSuccess(res));
      }
    } catch (err) {
      dispatch(authFailed(err));
    }
  };
};

const authLoading = () => ({
  type: AUTH_LOADING,
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const authFailed = err => ({
  type: AUTH_FAILED,
  payload: err,
});
