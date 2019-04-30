import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../Actions/authenticationActions.js';
import TextInput from '../inputs/TextInput.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  };

componentDidMount() {
  if (this.props.auth.isAuthenticated) {
    this.props.history.push('/dashboard');
  }
};

  componentWillReceiveProps(newProps) {
    if (newProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
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
    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginInfo);
    this.props.loginUser(loginInfo);
  };

  render() {
    const errors = this.state.errors;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.handleFormSubmit}>
                <TextInput
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
                  />
                  <TextInput
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    error={errors.password}
                    />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.authenticate,
  errors: state.errorMessages
});

export default connect(mapStateToProps, { loginUser })(Login);
