import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem.js';
import CommentForm from './CommentForm.js';
import CommentFeed from './CommentFeed.js';
import { Link } from 'react-router-dom';
import { getPost } from '../../Actions/postActions.js';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    const post = this.props.post.post;
    const loadingPosts = this.props.post.loadingPosts;
    let postContent;
    if (post === null || loadingPosts || Object.keys(post).length === 0) {
      postContent = <i className="fa fa-spinner" />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light md-3">
                Back to Post Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
