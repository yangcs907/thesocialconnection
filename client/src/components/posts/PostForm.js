import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextArea from '../inputs/TextArea.js';
import { addPost } from '../../Actions/postActions.js';
import { withRouter } from 'react-router-dom';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      submitted: false,
      errors: {}
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      })
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
    const user = this.props.auth.user;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({
      text: '',
      submitted: true
    });
  };

  render() {
    const errors = this.state.errors;
    // let successMessage;
    // if (this.state.submitted)  {
    //   successMessage = (
    //     <div>
    //   <p className="lead">Successfully created post!</p>
    //   </div>
    // )
    // } else {
    //   successMessage = null
    // }

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something!
          </div>
          <div className="card-body">
            <form onSubmit = {this.handleFormSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Create a post here"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleInputChange}
                  error={errors.text}
                  />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errorMessages,
  auth: state.authenticate
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));
