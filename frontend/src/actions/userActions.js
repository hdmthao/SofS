import Axios from 'axios';
import { BASE_URL } from '../constants/apiConstants' 
import {
  // USER_DETAILS_FAIL,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  // USER_UPDATE_PROFILE_FAIL,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_LIST_REQUEST,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAIL,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAIL,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
  USER_TOP_SELLERS_LIST_REQUEST,
  USER_TOP_SELLERS_LIST_SUCCESS,
  USER_TOP_SELLERS_LIST_FAIL,
} from '../constants/userConstants';

Axios.defaults.baseURL = BASE_URL;

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/sign-up', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.response });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data.response });
    localStorage.setItem('userInfo', JSON.stringify(data.response));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/sign-in', { email, password });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data.response });
    localStorage.setItem('userInfo', JSON.stringify(data.response));
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGN_OUT });
  document.location.href = '/sign-in';
};

// export const detailsUser = (userId) => async (dispatch, getState) => {
//   dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.get(`/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${userInfo?.token}` },
//     });
//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_DETAILS_FAIL, payload: message });
//   }
// };

// export const updateUserProfile = (user) => async (dispatch, getState) => {
//   dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(`/api/users/profile`, user, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     localStorage.setItem('userInfo', JSON.stringify(data));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
//   }
// };
// export const updateUser = (user) => async (dispatch, getState) => {
//   dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.put(`/api/users/${user._id}`, user, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_UPDATE_FAIL, payload: message });
//   }
// };
// export const listUsers = () => async (dispatch, getState) => {
//   dispatch({ type: USER_LIST_REQUEST });
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     const { data } = await Axios.get('/api/users', {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     });
//     dispatch({ type: USER_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_LIST_FAIL, payload: message });
//   }
// };
// export const deleteUser = (userId) => async (dispatch, getState) => {
//   dispatch({ type: USER_DELETE_REQUEST, payload: userId });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.delete(`/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_DELETE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_DELETE_FAIL, payload: message });
//   }
// };

export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOP_SELLERS_LIST_REQUEST });
  try {
    const { data } = await Axios.get('/api/top-sellers?limit=4');
    dispatch({ type: USER_TOP_SELLERS_LIST_SUCCESS, payload: data.response.topSellers });
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error.message
        : error.message;
    dispatch({ type: USER_TOP_SELLERS_LIST_FAIL, payload: message });
  }
};
