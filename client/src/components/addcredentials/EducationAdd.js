import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextArea from '../inputs/TextArea.js';
import TextInput from '../inputs/TextInput.js';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import { educationAdd } from '../../Actions/profileActions.js'

class EducationAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    };
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.educationAdd(educationData, this.props.history);
  };

  handleOnCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const errors = this.state.errors;


    return (
      <div className="education-add">
        <div className="container">
          <div className="row">
            <div className="col-md 8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="text-lead text-center">Add any school or education that you have attended in the past or current</p>
              <small className="d-block pb-3">* = required fields </small>
              <form onSubmit={this.handleFormSubmit}>
                <TextInput
                  placeholder="School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleInputChange}
                  error={errors.school}
                />
                <TextInput
                  placeholder="Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleInputChange}
                  error={errors.degree}
                />
                <TextInput
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleInputChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextInput
                  placeholder="from"
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.handleInputChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextInput
                  placeholder="to"
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleInputChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.handleOnCheck}
                  id="current"
                  />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextArea
                placeholder="Program Description"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                error={errors.description}
              />
            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

EducationAdd.propTypes = {
  educationAdd: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { educationAdd })(withRouter(EducationAdd));
