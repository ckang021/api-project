// backend/utils/validation.js
const { validationResult, check } = require('express-validator');

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
    .exists({ checkFalsy: true })
    .isLength({min: 5, max: 255})
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({min: 5, max: 50})
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({min: 2, max: 50})
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .isLength({min: 5, max: 50})
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({min: 5, max: 50})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({min: 10, max: 500})
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({min: 0})
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
]

const validateUpdateSpot = [
  check('address')
    .isLength({min: 5, max: 255})
    .optional()
    .withMessage('Street address is required'),
  check('city')
    .isLength({min: 5, max: 50})
    .optional()
    .withMessage('City is required'),
  check('state')
    .isLength({min: 2, max: 50})
    .optional()
    .withMessage('State is required'),
  check('country')
    .isLength({min: 5, max: 50})
    .optional()
    .withMessage('Country is required'),
  check('lat')
    .isFloat({min: -90, max: 90})
    .optional()
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .isFloat({min: -180, max: 180})
    .optional()
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .isLength({min: 5, max: 50})
    .optional()
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .isLength({min: 10, max: 500})
    .optional()
    .withMessage('Description is required'),
  check('price')
    .isFloat({min: 0})
    .optional()
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
]

const validateAddReview = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 500})
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
handleValidationErrors
]


module.exports = {
  handleValidationErrors, validateAddSpot, validateUpdateSpot, validateAddReview
};
