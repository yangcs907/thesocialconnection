import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { experienceDelete } from '../../Actions/profileActions.js';


class ExperienceDisplay extends Component {

  deleteThis = (id) => {
    this.props.experienceDelete(id);
  };

  render() {
    const experience = this.props.experience.map(experience => (
      <tr key={experience._id}>
        <td>{experience.company}</td>
        <td>{experience.title}</td>
        <td>
          <Moment format="MM/DD/YYYY">{experience.from}</Moment> - {' '}
            {experience.to === null ? ('Current') : (
              <Moment format="MM/DD/YYYY">{experience.to}</Moment>
            )}
        </td>
        <td><button onClick={() => this.deleteThis(experience._id)} className="btn btn-danger">Delete</button></td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
            </tr>
              {experience}
          </thead>
        </table>
      </div>
    )
  };
};

ExperienceDisplay.propTypes = {
  experienceDelete: PropTypes.func.isRequired
};

export default connect(null, { experienceDelete })(ExperienceDisplay);
