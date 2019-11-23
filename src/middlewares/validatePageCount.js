const {query} = require('express-validator');
const {sanitizeQuery} = require('express-validator');
const {isEqual} = require('lodash');

module.exports = [
  sanitizeQuery('page').toInt(),
  sanitizeQuery('count').toInt(),
  query('page').custom(page => {
    if ((!page && !isEqual(page, undefined)) || page <= 0) {
      throw new Error('Please provide valid page number!');
    }
    return true;
  }),
  query('count').custom(count => {
    if ((!count && !isEqual(count, undefined)) || count <= 0) {
      throw new Error('Please provide valid item count!');
    }
    return true;
  }),
];
