import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextArea from '../inputs/TextArea.js';
import { addComment } from '../../Actions/postActions.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    const postId = this.props.postId;

    const comment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    console.log(user);
    console.log(postId);
    console.log(comment);
    this.props.addComment(postId, comment);
    // axios
    // .post(`/api/posts/comment/${postId}`, comment)
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    this.setState({
      text: ''
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
            Comment on this post
          </div>
          <div className="card-body">
            <form onSubmit = {this.handleFormSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Comment on post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errorMessages,
  auth: state.authenticate
});

export default connect(mapStateToProps, { addComment })(withRouter(CommentForm));
