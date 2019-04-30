import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader.js';
import ProfileAbout from './ProfileAbout.js';
import ProfileCredentials from './ProfileCredentials.js';
import ProfileGithub from './ProfileGithub.js';
import { getProfileByHandle } from '../../Actions/profileActions.js';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.profile.profile === null && this.props.profile.loadingProfiles) {
      this.props.history.push('/not-found');
    }
  };

  render() {
    const profile = this.props.profile.profile;
    const loadingProfiles = this.props.profile.loadingProfiles;
    let profileContent;

    if (profile === null || loadingProfiles) {
      profileContent = <i className="fas fa-spinner"></i>
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6">
            </div>
          </div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileCredentials education={profile.education} experience={profile.experience}/>
          {profile.githubusername ? (<ProfileGithub username={profile.githubusername}/>) : null}
      </div>
      )
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>

      </div>
    )
  }
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
