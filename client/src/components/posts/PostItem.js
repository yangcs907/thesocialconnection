import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, likePost, unlikePost } from '../../Actions/postActions.js';

class PostItem extends Component {

  deleteThis = (id) => {
    this.props.deletePost(id);
  };
  handleLikeClick = (id) => {
    this.props.likePost(id);
  };
  handleUnlikeClick = (id) => {
    this.props.unlikePost(id);
  };

  findLikedPosts(likes) {
    const auth = this.props.auth;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const post = this.props.post;
    const auth = this.props.auth;
    const showActions = this.props.showActions;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
            <span>
              <button onClick={() => this.handleLikeClick(post._id)} className="btn btn-light mr-1">
                <i className={classnames('fas fa-thumbs-up', {
                    'text-info' : this.findLikedPosts(post.likes)
                  })}
                  />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button onClick={() => this.handleUnlikeClick(post._id)} className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments{' '}({post.comments.length})
              </Link>
              {post.user === auth.user.id ? (
                <button onClick={() => this.deleteThis(post._id)} className="btn btn-danger mr-1">
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>) : null}
          </div>
        </div>
      </div>
    )
  }
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authenticate
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostItem);
