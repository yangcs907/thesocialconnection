import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem.js';

class CommentFeed extends Component {
  render() {
    const comments = this.props.comments;
    const postId = this.props.postId;
    return (
      comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={postId} />
      ))
    )
  }
};

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
