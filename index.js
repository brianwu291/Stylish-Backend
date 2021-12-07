const express = require("express");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
