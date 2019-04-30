import axios from 'axios';
import setAuthWebToken from '../utils/setAuthWebToken.js';
import jwt_decode from 'jwt-decode';
import { GET_ERROR_MESSAGES, SET_CURRENT_USER } from './types.js';
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
  .post('/api/users/register', userData)
  .then(res => { history.push('/login');
    alert(`Successfully created account for ${userData.name}! You can now log in`);
    })  //redirects user to login page after registration
  .catch(err =>
    dispatch({
      type: GET_ERROR_MESSAGES,
      payload: err.response.data
    })
  );
};


// Login - get user web token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save token to local storage
      const webToken = res.data.token;
      localStorage.setItem('jwtToken', webToken);
      // set token to authorization header
      setAuthWebToken(webToken);
      // decode token to get user user data
      const decodedToken = jwt_decode(webToken);
      // set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      }));
};

// set logged in user
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  }
};

// log out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  // remove auth header
  setAuthWebToken(false);
  // set current user to empty object, which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
