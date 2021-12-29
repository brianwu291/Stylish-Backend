import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

import { getDBConnection, useDBWithName } from './modules/connection.js';
import productsRoutes from './routes/productsRoutes.js';

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
productsRoutes(app);

// app.get('/', (req, res, next) => {
//   next();
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
