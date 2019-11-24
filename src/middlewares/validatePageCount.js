const {query} = require('express-validator');
const {sanitizeQuery} = require('express-validator');

module.exports = [
  query('page')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid page number!')
    .custom(page => {
      if (page && page <= 0) {
        throw new Error('Page number must be greater than 0!');
      }
      return true;
    }),
  query('count')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid item count!')
    .custom(count => {
      if (count && count <= 0) {
        throw new Error('Item count must be greater than 0!');
      }
      return true;
    }),
  sanitizeQuery('page').toInt(),
  sanitizeQuery('count').toInt(),
];
