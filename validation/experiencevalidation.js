const Validator = require('validator');
const isEmpty = require('./emptyCheck');

module.exports = function experiencevalidation(input) {
  let errors = {};

  input.title = !isEmpty(input.title) ? input.title : '';
  input.company = !isEmpty(input.company) ? input.company : '';
  input.from = !isEmpty(input.from) ? input.from : '';

  if (Validator.isEmpty(input.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(input.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(input.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
