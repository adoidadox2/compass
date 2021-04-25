import { body, query } from 'express-validator';

const cityMiddleware = {
  storeRules: [
    body('name')
      .exists()
      .withMessage('Enter a name')
      .notEmpty()
      .withMessage('Name cannot be empty')
      .isString()
      .withMessage('Name must be a string')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters'),
    body('state')
      .exists()
      .withMessage('Enter a state')
      .notEmpty()
      .withMessage('State cannot be empty')
      .isString()
      .withMessage('State must be a string')
      .trim()
      .isLength({ min: 2 })
      .withMessage('State must be at least 2 characters'),
  ],
  indexRules: [
    query('state')
      .exists()
      .withMessage('Enter a state')
      .trim()
      .notEmpty()
      .withMessage('State cannot be empty')
      .optional(),
    query('city')
      .exists()
      .withMessage('Enter a city')
      .trim()
      .notEmpty()
      .withMessage('City cannot be empty')
      .optional(),
  ],
};

export default cityMiddleware;
