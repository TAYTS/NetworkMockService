/////////////////////////////////////////
/*      import library and setup       */
/////////////////////////////////////////
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;
