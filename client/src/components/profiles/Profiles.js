import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItems from './ProfileItems.js';
import { getProfiles } from '../../Actions/profileActions.js';
import axios from 'axios';

class Profiles extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     profiles: []
  //   }
  // };
  // componentDidMount() {
  //   axios.get('api/profile/all').then(res => {
  //     console.log(res.data);
  //     this.setState({
  //       profiles: res.data
  //     })
  //   })
  // };
  componentDidMount() {
    this.props.getProfiles();
    // axios.get('api/profile/all').then(res => {
    //   console.log(res.data)
    // })
  };

  render() {
    const profiles = this.props.profile.profiles;
    const loadingProfiles = this.props.profile.loadingProfiles;
    let profileItems;

    if (profiles === null || loadingProfiles ) {
      profileItems = <i className="fas fa-spinner"></i>
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItems key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h4>No Profiles Found</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md 12">
              <h1 className="display-4 text-center">Social Profiles</h1>
              <p className="lead text-center">
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
