/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
