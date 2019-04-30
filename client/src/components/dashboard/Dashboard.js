import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../Actions/profileActions.js';
import { Link } from 'react-router-dom';
import Profile from './Profile.js';
import ExperienceDisplay from './ExperienceDisplay.js';
import EducationDisplay from './EducationDisplay.js';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  };

  deleteThis = event => {
    this.props.deleteAccount();
  };

  render() {
    const user = this.props.auth.user;
    const profile = this.props.profile.profile;
    const loadingProfiles = this.props.profile.loadingProfiles;
    let content;
    if (profile === null || loadingProfiles) {
      content = <h4>
        Loading {'   '}
        <i className="fas fa-spinner"></i>
      </h4>
    } else {
      content = <h1>Dashboard Content</h1>
      // check if current user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <p className="lead text-muted">
                  Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </p>
                <Profile />
                <ExperienceDisplay experience={profile.experience} />
                <EducationDisplay education={profile.education} />
                <div style={{marginBottom:'60px'}}>
                  <button onClick={this.deleteThis} className="btn btn-danger">Delete Account</button>
                </div>
          </div>
        )
      } else {
        // user logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet created a profile please click below to add info</p>
            <Link to ="/profilecreate" className="btn btn-lg btn-info">
                Create Profile
            </Link>
          </div>
        )
      }
    };
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.authenticate
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
