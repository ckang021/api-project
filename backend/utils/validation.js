// backend/utils/validation.js
const { validationResult, check, param, query } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateAddSpot = [
  check('address')
    .not()
    .isEmpty()
    .isLength({min: 5, max: 255})
    .withMessage('Street address is required'),
  check('city')
    .not()
    .isEmpty()
    .isLength({min: 5, max: 50})
    .withMessage('City is required'),
  check('state')
    .not()
    .isEmpty()
    .isLength({min: 2, max: 50})
    .withMessage('State is required'),
  check('country')
    .not()
    .isEmpty()
    .isLength({min: 5, max: 50})
    .withMessage('Country is required'),
  check('lat')
    .not()
    .isEmpty()
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .not()
    .isEmpty()
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .not()
    .isEmpty()
    .isLength({min: 5, max: 50})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .not()
    .isEmpty()
    .isLength({min: 10, max: 500})
    .withMessage('Description is required'),
  check('price')
    .not()
    .isEmpty()
    .isFloat({min: 0})
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors, validateAddSpot
};
