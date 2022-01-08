import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDatabase } from './modules/connection.js';
import productsRoutes from './routes/productsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

connectDatabase();

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors({
  origin: 'http://localhost:3000'
}));

/* Routes */
productsRoutes(app);
usersRoutes(app);

// app.get('/', (req, res, next) => {
//   next();
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
