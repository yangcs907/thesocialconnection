// routes will start with /api/profile
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// import validation
const profilevalidation = require('../../validation/profilevalidation.js');
const experiencevalidation = require('../../validation/experiencevalidation.js');
const educationvalidation = require('../../validation/educationvalidation.js');

//load profile model
const Profile = require('../../models/Profile.js');
const User = require('../../models/User.js');
// @route GET api/profile/test
// @description - tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route GET api/profile
// @description - gets current user profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/all
// @description - get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find({})
    .populate('user', ['name','avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles!'
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: 'There are no profiles!'})
    });
});

// @route GET api/profile/handle/:handle   - front end route will be ex. --> api/profile/chrisyang
// @description - get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @description - get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user!';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'No profile found for this user'}));
});

// @route POST api/profile
// @description - create or edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = profilevalidation(req.body);

  if (!isValid) {
    // return any errors with 400 status
    return res.status(400).json(errors);
  };
  // get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // skills - split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(','); // will be split from a csv
  }
  // social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.instagram = req.body.instagram;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.handle) profileFields.handle = req.body.handle;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // then update
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile));
      } else {
        // then create
        // check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors)
            }
            // Save profile
            new Profile(profileFields).save().then(profile => res.json(profile))
              .catch(err => res.json(err));
          });
      }
    });
});

// @route POST api/profile/experience
// @description - Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, isValid } = experiencevalidation(req.body);

  if (!isValid) {
    // return any errors with 400 status
    return res.status(400).json(errors);
  };
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to experience array
      profile.experience.unshift(newExperience); //adds object to beginning of array (upshift)
      profile.save().then(profile => res.json(profile));
    })
});

// @route POST api/profile/education
// @description - Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, isValid } = educationvalidation(req.body);

  if (!isValid) {
    // return any errors with 400 status
    return res.status(400).json(errors);
  };
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to experience array
      profile.education.unshift(newEducation); //adds object to beginning of array (upshift)
      profile.save().then(profile => res.json(profile));
    })
});

// @route DELETE api/profile/experience/:exp_id
// @description - Delete Experience from profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, isValid } = educationvalidation(req.body);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
        //splice out of array
      profile.experience.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route DELETE api/profile/education/:edu_id
// @description - Delete Education from profile
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, isValid } = educationvalidation(req.body);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
        //splice out of array
      profile.education.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route DELETE api/profile/profile/
// @description - Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session : false }), (req, res) => {
  const { errors, isValid } = educationvalidation(req.body);

  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id})
        .then(() => res.json( { success: true }))
    })
});


module.exports = router;
