const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const bodyParser = require("body-parser");

const { env } = require("./env");

const { connectDatabase } = require("./models/index");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const campaignsRoutes = require("./routes/campaignsRoutes");

connectDatabase();

const app = express();

/* Middleware */
// app.use(helmet());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: env.origin,
  })
);

/* Routes */
productsRoutes(app);
usersRoutes(app);
campaignsRoutes(app);

app.listen(env.port, () => {
  console.log("Listening at " + env.port);
});
