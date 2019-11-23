/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const express = require('express');
const {param} = require('express-validator/check');

/////////////////////////////////////////
/*         import controllers          */
/////////////////////////////////////////
const {getAllContacts, getContactById} = require('~controllers/contact');

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////

/////////////////////////////////////////
/*           setup middleware          */
/////////////////////////////////////////
const router = express.Router();
const validatePageCount = require('~middlewares/validatePageCount');

/////////////////////////////////////////
/*             define routes           */
/////////////////////////////////////////
router.get('/', validatePageCount, getAllContacts);

router.get(
  '/:contactId',
  [
    param('contactId')
      .trim()
      .isMongoId()
      .withMessage('Please provide a valid contact id!'),
  ],
  getContactById,
);

module.exports = router;
