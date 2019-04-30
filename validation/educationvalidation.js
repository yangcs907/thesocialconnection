const Validator = require('validator');
const isEmpty = require('./emptyCheck');

module.exports = function educationvalidation(input) {
  let errors = {};

  input.school = !isEmpty(input.school) ? input.school : '';
  input.degree = !isEmpty(input.degree) ? input.degree : '';
  input.fieldofstudy = !isEmpty(input.fieldofstudy) ? input.fieldofstudy : '';
  input.from = !isEmpty(input.from) ? input.from : '';

  if (Validator.isEmpty(input.school)) {
    errors.school = 'School field is required';
  }

  if (Validator.isEmpty(input.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(input.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required';
  }

  if (Validator.isEmpty(input.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
