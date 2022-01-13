const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectDatabase } = require("./models/index");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");

connectDatabase();

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/* Routes */
productsRoutes(app);
usersRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
