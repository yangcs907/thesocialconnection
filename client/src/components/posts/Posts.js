import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed.js';
import { getPosts } from '../../Actions/postActions.js';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  render() {
    const posts = this.props.post.posts;
    const loadingPosts = this.props.post.loadingPosts;
    let postContent;
    if (posts === null || loadingPosts) {
      postContent = <i className = "fa fa-spinner"></i>
    } else {
      postContent = <PostFeed posts={posts} />
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
