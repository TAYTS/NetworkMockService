/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {version} = require('~/package.json');

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
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Network Mock Service',
      version,
    },
    basePath: '/',
  },
  apis: [`${__dirname}/*.js`],
});

/////////////////////////////////////////
/*             define routes           */
/////////////////////////////////////////
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerSpec));

module.exports = router;
