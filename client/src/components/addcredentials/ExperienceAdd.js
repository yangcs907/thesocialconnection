import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextArea from '../inputs/TextArea.js';
import TextInput from '../inputs/TextInput.js';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import { experienceAdd } from '../../Actions/profileActions.js'

class ExperienceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
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
    const experienceData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.experienceAdd(experienceData, this.props.history);
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
      <div className="experience-add">
        <div className="container">
          <div className="row">
            <div className="col-md 8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="text-lead text-center">Add any job or position that you have had in the past or current</p>
              <small className="d-block pb-3">* = required fields </small>
              <form onSubmit={this.handleFormSubmit}>
                <TextInput
                  placeholder="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChange}
                  error={errors.company}
                />
                <TextInput
                  placeholder="Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  error={errors.title}
                />
                <TextInput
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                  error={errors.location}
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
                placeholder="Job Description"
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

ExperienceAdd.propTypes = {
  experienceAdd: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { experienceAdd })(withRouter(ExperienceAdd));
