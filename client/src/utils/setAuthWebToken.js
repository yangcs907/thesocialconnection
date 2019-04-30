import axios from 'axios';

const setAuthWebToken = (webToken) => {
  if (webToken) {
    // apply to every request
    axios.defaults.headers.common['Authorization'] = webToken;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthWebToken;
