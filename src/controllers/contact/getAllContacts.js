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

    const currentPage = req.query.page || 1;
    const itemPerPage = req.query.count || 100;

    const totalCountPromise = Contact.find().countDocuments();
    const contactDataPromise = await Contact.find()
      .skip((currentPage - 1) * itemPerPage)
      .limit(itemPerPage);

    const [totalCount, contactData] = await Promise.all([
      totalCountPromise,
      contactDataPromise,
    ]);

    res.status(200).json({
      data: {
        contacts: contactData,
        totalCount,
      },
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
