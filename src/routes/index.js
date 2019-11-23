/////////////////////////////////////////
/*         import node library         */
/////////////////////////////////////////
const express = require('express');

/////////////////////////////////////////
/*            import routes            */
/////////////////////////////////////////
const apiDocsRoutes = require('./swagger');
const contactRoutes = require('./contact');

/////////////////////////////////////////
/*            setup routes             */
/////////////////////////////////////////
const app = express();

app.use('/api-docs', apiDocsRoutes);
app.use('/contact', contactRoutes);

module.exports = app;
