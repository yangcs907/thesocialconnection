import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCredentials extends Component {
  render() {
    const experience = this.props.experience;
    const education = this.props.education;
    const experienceItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {' '}
          {exp.to === null ? (' Current') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
        </p>
        <p><strong>Position: {exp.title}</strong></p>
        <p>{exp.location === '' ? null : (<span><strong>Where: {exp.location}</strong></span>)}</p>
        <p>{exp.description === '' ? null : (<span><strong>{exp.description}</strong></span>)}</p>
      </li>
    ));
    const educationItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {' '}
          {edu.to === null ? (' Current') : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
        </p>
        <p><strong>Degree: {edu.degree}</strong></p>
        <p><strong>Field of Study: {edu.fieldofstudy}</strong></p>
        <p>{edu.description === '' ? null : (<span><strong>{edu.description}</strong></span>)}</p>
      </li>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info"></h3>
          {experienceItems.length > 0 ? (
            <ul className="list-group">{experienceItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info"></h3>
          {educationItems.length > 0 ? (
            <ul className="list-group">{educationItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    )
  }
};

export default ProfileCredentials;
