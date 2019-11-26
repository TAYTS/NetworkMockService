/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const {validationResult} = require('express-validator');

/////////////////////////////////////////
/*            import models            */
/////////////////////////////////////////
const Contact = require('~models/contact');

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
const validationHandler = require('~utils/validationHandler');

/////////////////////////////////////////
/*           define controller         */
/////////////////////////////////////////
module.exports = async function getAllEvents(req, res, next) {
  const errors = validationResult(req);

  try {
    // 1. Validate the query params
    validationHandler(errors, null, 422);

    // 2. Query the data
    const contactId = req.params.contactId;
    const contactData = await Contact.findById(contactId);

    if (!contactData) {
      const error = new Error('Contact not found.');
      error.statusCode = 404;
      throw error;
    }

    // 3. Return the response
    res.status(200).json({
      data: contactData,
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
