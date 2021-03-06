/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const {isEmail, isMongoId, isLength} = require('validator');
const {map} = require('lodash');

/////////////////////////////////////////
/*            import models            */
/////////////////////////////////////////
const Contact = require('~models/contact');

/////////////////////////////////////////
/*           define resolver           */
/////////////////////////////////////////
module.exports = {
  contacts: async function({page, count}) {
    // 1. Validate the query params
    const errors = [];
    if (page <= 0) {
      errors.push({message: 'Invalid page number.'});
    }
    if (count <= 0) {
      errors.push({message: 'Invalid page count.'});
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    // 2. Query the data
    const currentPage = page || 1;
    const itemPerPage = count || 100;

    const totalCountPromise = Contact.find().countDocuments();
    const contactDataPromise = Contact.find()
      .skip((currentPage - 1) * itemPerPage)
      .limit(itemPerPage);

    const [totalCount, contactData] = await Promise.all([
      totalCountPromise,
      contactDataPromise,
    ]);

    // 3. Return the response
    return {
      contacts: map(contactData, contact => {
        return {
          ...contact._doc,
          _id: contact._id.toString(),
        };
      }),
      totalCount,
    };
  },
  contact: async function({id}) {
    // 1. Validate the query params
    const errors = [];
    if (!isMongoId(id)) {
      errors.push({message: 'Invalid id.'});
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    // 2. Query the data
    const contactData = await Contact.findById(id);

    if (!contactData) {
      const error = new Error('Contact not found.');
      error.data = {message: 'Contact not found.'};
      error.code = 404;
      throw error;
    }

    // 3. Return the response
    return {
      ...contactData._doc,
      _id: contactData._id.toString(),
    };
  },
  searchContact: async function({name, page, count}) {
    // 1. Validate the query params
    const errors = [];
    if (!isLength(name, {min: 3, max: 15})) {
      errors.push({message: 'Name string length should be between 3 and 15.'});
    }
    if (page <= 0) {
      errors.push({message: 'Invalid page number.'});
    }
    if (count <= 0) {
      errors.push({message: 'Invalid page count.'});
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    // 2. Query the data
    const currentPage = page || 1;
    const itemPerPage = count || 100;
    const searchString = name;

    const totalCountPromise = Contact.find({
      $text: {$search: searchString},
    }).countDocuments();

    const contactDataPromise = Contact.find({
      $text: {
        $search: searchString,
      },
    })
      .skip((currentPage - 1) * itemPerPage)
      .limit(itemPerPage);

    const [totalCount, contactData] = await Promise.all([
      totalCountPromise,
      contactDataPromise,
    ]);

    // 3. Return the response
    return {
      contacts: map(contactData, contact => {
        return {
          ...contact._doc,
          _id: contact._id.toString(),
        };
      }),
      totalCount,
    };
  },
  updateEmail: async function({id, email}, req) {
    // 1. Validate the query params
    const errors = [];
    if (!isEmail(email)) {
      errors.push({message: 'Invalid email.'});
    }
    if (!isMongoId(id)) {
      errors.push({message: 'Invalid id.'});
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    // 2. Update the data
    const contact = await Contact.findById(id);
    if (!contact) {
      const error = new Error('Contact not found.');
      error.data = {message: 'Contact not found.'};
      error.code = 404;
      throw error;
    }
    contact.email = email;
    const newContact = await contact.save();

    // 3. Return the response
    return {
      ...newContact._doc,
      _id: newContact._id.toString(),
    };
  },
};
