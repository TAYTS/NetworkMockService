/////////////////////////////////////////
/*         import node library         */
/////////////////////////////////////////
const express = require('express');

/////////////////////////////////////////
/*            import routes            */
/////////////////////////////////////////
const apiDocsRoutes = require('./swagger');
const graphqlRoutes = require('./graphql');
const contactRoutes = require('./contact');

/////////////////////////////////////////
/*            setup routes             */
/////////////////////////////////////////
const app = express();

app.use('/api-docs', apiDocsRoutes);
app.use('/graphql', graphqlRoutes);
app.use('/contact', contactRoutes);

module.exports = app;
