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
    validationHandler(errors, null, 422);
    const contactId = req.params.contactId;

    const contactData = await Contact.findById(contactId);

    if (!contactData) {
      const error = new Error('Contact not found.');
      error.statusCode = 404;
      throw error;
    }

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
