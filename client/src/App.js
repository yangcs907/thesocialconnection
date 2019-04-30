import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthWebToken from './utils/setAuthWebToken.js';
import { setCurrentUser, logoutUser } from './Actions/authenticationActions.js';
import { clearCurrentProfile } from './Actions/profileActions.js';
import { Provider } from 'react-redux';
import store from './Store';
import PrivateRoutes from './components/privateroutes/PrivateRoutes.js';

import './App.css';

import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Dashboard from './components/dashboard/Dashboard.js';
import ProfileCreate from './components/profilecreate/ProfileCreate.js';
import ProfileEdit from './components/profileedit/ProfileEdit.js';
import ExperienceAdd from './components/addcredentials/ExperienceAdd.js';
import EducationAdd from './components/addcredentials/EducationAdd.js';
import Profiles from './components/profiles/Profiles.js';
import Profile from './components/profile/Profile.js';
import Posts from './components/posts/Posts.js';
import Post from './components/post/Post.js';
import NotFound from './components/notfound/NotFound.js';
import Footer from './components/layout/Footer.js';

if (localStorage.jwtToken) {
  // set auth token header
  setAuthWebToken(localStorage.jwtToken);
  // decode token and get user info and expiration
  const decodedToken = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
};

class App extends Component {
  render() {
    return (
      <Provider store= { store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path = "/" component = {Landing} />
            <div className="container">
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/profiles" component = {Profiles} />
              <Route exact path = "/profile/:handle" component = {Profile} />

            <Switch>
                <PrivateRoutes exact path = "/dashboard" component = {Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/profilecreate" component = {ProfileCreate} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/profileedit" component = {ProfileEdit} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/experienceadd" component = {ExperienceAdd} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/educationadd" component = {EducationAdd} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/feed" component = {Posts} />
              </Switch>
              <Switch>
                <PrivateRoutes exact path = "/post/:id" component = {Post} />
              </Switch>
              <Route exact path = "/not-found" component = {NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
};

export default App;
