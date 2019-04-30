const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

//load inputValidation
const registervalidation = require('../../validation/registervalidation.js');
const loginvalidation = require('../../validation/loginvalidation.js');

//load User model
const User = require('../../models/User.js');

// @route GET api/users/test
// @description - tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

// @route POST api/users/register
// @description - register a user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = registervalidation(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm' //default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});

// @route GET api/users/login
// @description - logins user / returning json web token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = loginvalidation(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({ email })
    .then(user => {
      //check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched
            // create jwt payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };
            // sign token
            // expires in # seconds
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            errors.password = 'Password is incorrect'
            return res.status(400).json(errors);
          }
        })
    });
});

// @route GET api/users/currentuser
// @description - returns current user
// @access private
router.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
});


module.exports = router;
