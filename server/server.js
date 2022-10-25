const mysql = require("mysql");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({
  path: `${__dirname}/config.env`,
});

const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventorymsdatabase",
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}`));

module.exports = DB;
