const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post.js');
const Profile = require('../../models/Profile.js');

const postvalidation = require('../../validation/postvalidation.js');

// @route GET api/posts/test
// @description - tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

// @route GET api/posts
// @description get posts
// @access public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ postsnotfound: "no posts found" }));
});

// @route GET api/posts/:id
// @description get post by id
// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ postnotfound: "no post found" }));
});

// @route POST api/posts
// @description create a post
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = postvalidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route DELETE api/posts/:id
// @description deletes a particular post
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ authorization: 'not authorized' });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'no post found' }));
    });
});

// @route POST api/posts/like/:id
// @description likes a post
// @access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: "User has already liked this post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'no post found' }));
    });
});

// @route POST api/posts/unlike/:id
// @description unlikes a post
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ nolikedyet: "You have not liked this post yet" });
          }
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //splice it out of array
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'no post found' }));
    });
});

// @route POST api/posts/comment/:id
// @description add comment to post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = postvalidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      // add to comments array
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'no post found'}));
});

// @route DELETE api/posts/comment/:id/:comment_id
// @description remove comment from post
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // check to see if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotfound: 'comment not found'});
      }
      // get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ commentnotfound: 'comment not found'}));
});


module.exports = router;