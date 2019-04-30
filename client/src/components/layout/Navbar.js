import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/authenticationActions.js';
import { clearCurrentProfile } from '../../Actions/profileActions.js';

const activeStyle = {
  color: "#ff6969"
};
const iconStyle = {
  color:"rgba(255,255,255,0.7)"
};



class Navbar extends Component {
  onLogout = (event) => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isAuthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/feed" activeStyle={activeStyle}>
            <i className="fas fa-book-open" style={iconStyle} />
              <sup style={{marginLeft:"7px"}}>Posts</sup>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard" activeStyle={activeStyle}>
            <img
              className="rounded-circle"
              src = {user.avatar}
              alt={user.name}
              style={{ width: "20px", marginRight: "5px",marginBottom:"10px"}}
              title="You must have gravatar connecte to email to display image"
            />
          <sup style={{marginLeft:"2px"}}>Profile</sup>
          </NavLink>

        </li>
        <li className="nav-item">
          <a onClick = {this.onLogout.bind(this)} className="nav-link" style={{cursor:"pointer"}}>
            <i className="fas fa-sign-out-alt" style={iconStyle} />
            <sup style={{marginLeft:"7px"}}>Log Out</sup>
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register" activeStyle={activeStyle}>
            <i className="fas fa-user-edit" style={iconStyle} />
            <sup style={{marginLeft:"7px"}}>Sign Up</sup>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login" activeStyle={activeStyle}>
            <i className="fas fa-sign-in-alt" style={iconStyle} />
            <sup style={{marginLeft:"7px"}}>Log In</sup>
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4" style={{paddingTop:"15px"}}>
        <div className="container">
          <NavLink className="navbar-brand" to="/">Social Connect</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profiles" activeStyle={activeStyle}>
                  {}
                  Developers
                </NavLink>
              </li>
            </ul>
            {isAuthenticated ? isAuthLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
