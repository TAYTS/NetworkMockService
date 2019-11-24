/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('~graphql/schema');
const resolver = require('~graphql/resolvers');

/////////////////////////////////////////
/*         import controllers          */
/////////////////////////////////////////

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////

/////////////////////////////////////////
/*           setup middleware          */
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
/*             define routes           */
/////////////////////////////////////////
router.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'Error occurred.';
      const status = err.originalError.code || 500;

      return {message, status, data};
    },
  }),
);

module.exports = router;
