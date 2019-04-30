import axios from 'axios';
import { GET_CURRENT_PROFILE, LOADING_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERROR_MESSAGES, SET_CURRENT_USER, GET_USER_PROFILES } from './types.js';
// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    })
};

// create profile
export const profileCreate = (profileInput, history) => dispatch => {
  axios
    .post('/api/profile', profileInput)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};

// add experience to profile
export const experienceAdd = (experienceData, history) => dispatch => {
  axios
    .post('/api/profile/experience', experienceData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};

// delete experience from profile
export const experienceDelete = (id) => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      }))
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};

// add education to profile
export const educationAdd = (educationData, history) => dispatch => {
  axios
    .post('/api/profile/education', educationData )
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};

// delete education from profile
export const educationDelete = (id) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      }))
    .catch(err => {
      dispatch({
        type: GET_ERROR_MESSAGES,
        payload: err.response.data
      })
    })
};

// gets all profiles
export const getProfiles = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_USER_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_USER_PROFILES,
        payload: null
      })
    })
};

// gets profile by unique handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(profileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      }))
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: null
      })
    })
};

// delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can not be undone')) {
    axios
      .delete('/api/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERROR_MESSAGES,
          payload: err.response.data
        })
      })
  }
};

// profile loading
export const profileLoading = () => {
  return {
    type: LOADING_PROFILE
  }
};

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};
