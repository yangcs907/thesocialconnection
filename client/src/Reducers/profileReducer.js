import { GET_CURRENT_PROFILE, LOADING_PROFILE, CLEAR_CURRENT_PROFILE, GET_USER_PROFILES } from '../Actions/types.js';

const initialState = {
  profile: null,
  profiles: null,
  loadingProfiles: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        loadingProfiles: true
      }
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loadingProfiles: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    case GET_USER_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loadingProfiles: false
      }
    default:
      return state;
  }
};
