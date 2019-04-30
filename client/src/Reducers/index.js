// root reducer
import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import getErrorsReducer from './getErrorsReducer.js';
import profileReducer from './profileReducer.js';
import postReducer from './postReducer.js';

export default combineReducers({
  authenticate: authenticationReducer,
  errorMessages: getErrorsReducer,
  profile: profileReducer,
  post: postReducer
});
