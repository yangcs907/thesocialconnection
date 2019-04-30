const Validator = require('validator');
const isEmpty = require('./emptyCheck');

module.exports = function profilevalidation(input) {
  let errors = {};

  input.handle = !isEmpty(input.handle) ? input.handle : '';
  input.status = !isEmpty(input.status) ? input.status : '';
  input.skills = !isEmpty(input.skills) ? input.skills : '';

  if (!Validator.isLength(input.handle, { min: 2, max: 50})) {
    errors.handle = 'Handle needs to be within 2 and 40 characters';
  }

  if (Validator.isEmpty(input.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(input.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(input.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!isEmpty(input.website)) {
    if (!Validator.isURL(input.website)) {
      errors.website = 'Not valid URL'
    }
  }

  if (!isEmpty(input.youtube)) {
    if (!Validator.isURL(input.youtube)) {
      errors.youtube = 'Not valid URL'
    }
  }

  if (!isEmpty(input.twitter)) {
    if (!Validator.isURL(input.twitter)) {
      errors.twitter = 'Not valid URL'
    }
  }

  if (!isEmpty(input.facebook)) {
    if (!Validator.isURL(input.facebook)) {
      errors.facebook = 'Not valid URL'
    }
  }

  if (!isEmpty(input.linkedin)) {
    if (!Validator.isURL(input.linkedin)) {
      errors.linkedin = 'Not valid URL'
    }
  }

  if (!isEmpty(input.instagram)) {
    if (!Validator.isURL(input.instagram)) {
      errors.instagram = 'Not valid URL'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
