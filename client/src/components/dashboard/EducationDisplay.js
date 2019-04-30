import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { educationDelete } from '../../Actions/profileActions.js';


class EducationDisplay extends Component {

  deleteThis = (id) => {
    this.props.educationDelete(id);
  };

  render() {
    const education = this.props.education.map(education => (
      <tr key={education._id}>
        <td>{education.school}</td>
        <td>{education.degree}</td>
        <td>
          <Moment format="MM/DD/YYYY">{education.from}</Moment> - {' '}
            {education.to === null ? ('Current') : (
              <Moment format="MM/DD/YYYY">{education.to}</Moment>
            )}
        </td>
        <td><button onClick={() => this.deleteThis(education._id)} className="btn btn-danger">Delete</button></td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
            </tr>
              {education}
          </thead>
        </table>
      </div>
    )
  };
};

EducationDisplay.propTypes = {
  educationDelete: PropTypes.func.isRequired
};

export default connect(null, { educationDelete })(EducationDisplay);
