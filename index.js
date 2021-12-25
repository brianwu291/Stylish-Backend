require('dotenv').config();

// const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { getDBConnection, useDBWithName } = require('./modules/connection');

getDBConnection()
  .then((connection) => {
    useDBWithName({ connection, dbName: `foodie_${process.env.NODE_ENV}` })
  });

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:3000'
}));

/* Routes */
require('./routes/productsRoutes')(app);

// app.get('/', (req, res, next) => {
//   next();
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
