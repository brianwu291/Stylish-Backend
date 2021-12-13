require('dotenv').config();

const path = require("path");
const mysql = require("mysql");

const express = require("express");

const app = express();

const connection = mysql.createConnection({
  host     : process.env.dbHost,
  user     : process.env.dbUser,
  password : process.env.dbPassword,
});
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

// app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
