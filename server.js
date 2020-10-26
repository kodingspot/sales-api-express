require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();

// Handle CORS
app.use(cors())

// parse requests of content-type: application/json
app.use(bodyParser.json());

require('./src/routes/product.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/cart.route')(app);

// set port, listen for requests
app.listen(3001, () => {
  console.log('Server is running on port 3001.');
});

