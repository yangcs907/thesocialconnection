import { ADD_POST, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from '../Actions/types.js';

const initialState = {
  posts: [],
  post: {},
  loadingPosts: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        loadingPosts: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false
      }
    case GET_POST:
    return {
      ...state,
      post: action.payload,
      loadingPosts: false
    }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    default:
      return state;
  }
};
