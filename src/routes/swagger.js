/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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
      version: '1.0.0',
    },
    basePath: '/',
  },
  apis: [`${__dirname}/*.js`],
});

/////////////////////////////////////////
/*             define routes           */
/////////////////////////////////////////
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerSpec, {}));
router.get('/test.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;
