import { body, query, param } from 'express-validator';

const customerMiddleware = {
  storeRules: [
    body('full_name')
      .exists()
      .withMessage('Enter a name')
      .trim()
      .notEmpty()
      .withMessage('Name cannot be empty')
      .isString()
      .withMessage('Name must be a string')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters'),
    body('birth_date')
      .exists()
      .withMessage('Enter a date')
      .notEmpty()
      .withMessage('Birth date cannot be empty')
      .isDate()
      .withMessage('Birth date must be a date'),
    body('gender')
      .exists()
      .withMessage('Enter a gender')
      .trim()
      .notEmpty()
      .withMessage('Gender cannot be empty')
      .isString()
      .withMessage('Gender must be a string')
      .isIn(['male', 'female', 'other'])
      .withMessage('Enter a valid gender'),
    body('city_id')
      .exists()
      .withMessage('Enter a city id')
      .notEmpty()
      .withMessage('City id cannot be empty')
      .isMongoId()
      .withMessage('City id must be a mongoId'),
  ],
  indexRules: [
    query('name')
      .exists()
      .withMessage('Enter a name')
      .trim()
      .notEmpty()
      .withMessage('Name cannot be empty')
      .optional(),
  ],
  showRules: [
    param('customer_id')
      .exists()
      .withMessage('Enter a customer id')
      .notEmpty()
      .withMessage('Customer id cannot be empty')
      .isMongoId()
      .withMessage('Customer id must be a mongoId'),
  ],
  deleteRules: [
    param('customer_id')
      .exists()
      .withMessage('Enter a customer id')
      .notEmpty()
      .withMessage('Customer id cannot be empty')
      .isMongoId()
      .withMessage('Customer id must be a mongoId'),
  ],
  updateRules: [
    param('customer_id')
      .exists()
      .withMessage('Enter a customer id')
      .notEmpty()
      .withMessage('Customer id cannot be empty')
      .isMongoId()
      .withMessage('Customer id must be a mongoId'),
    body('full_name')
      .exists()
      .withMessage('Enter a name')
      .trim()
      .notEmpty()
      .withMessage('Name cannot be empty')
      .isString()
      .withMessage('Name must be a string')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters'),
  ],
};

export default customerMiddleware;
