const Validator = require('validator');
const isEmpty = require('./emptyCheck');

module.exports = function postvalidation(input) {
  let errors = {};

  input.text = !isEmpty(input.text) ? input.text : '';

  if (!Validator.isLength(input.text, { min: 5, max: 700 })) {
    errors.text = 'Post must be between 5 and 700 characters';
  }

  if (Validator.isEmpty(input.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
