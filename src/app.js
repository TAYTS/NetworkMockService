/////////////////////////////////////////
/*       import external library       */
/////////////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

/////////////////////////////////////////
/*          setup middlewares          */
/////////////////////////////////////////
const app = express();
const bodyParser = require('~middlewares/bodyParser');
const cors = require('~middlewares/cors');
const routes = require('~routes');
const errorHandler = require('~middlewares/errorsHandler');

/////////////////////////////////////////
/*        connect middlewares          */
/////////////////////////////////////////
/*        The order is important       */
app.use(bodyParser);
app.use(cors);
app.use(routes);
app.use(errorHandler);
app.use('/ping', (req, res) => {
  res.send('Service is alive.');
});

/////////////////////////////////////////
/*        Setup server and DB          */
/////////////////////////////////////////
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_DB_NAME,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(result => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT);
    console.log(`Server start on ${PORT}`);
  })
  .catch(err => {
    console.log('error', err);
  });
