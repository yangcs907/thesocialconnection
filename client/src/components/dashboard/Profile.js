import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/profileedit" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
      <Link to="/experienceadd" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1"></i>
        Add Experience</Link>
      <Link to="educationadd" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1"></i>
        Add Education</Link>
    </div>
  )
};

export default Profile;
