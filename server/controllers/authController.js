const mysql = require("mysql");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const { JsonWebTokenError } = require("jsonwebtoken");
const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventoryms",
});
exports.adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    sqlGet = "SELECT * from admins WHERE email=? and password=?";
    DB.query(sqlGet, [email, password], (err, result) => {
      console.log(result);
      console.log(err);
      if (result) {
        res.send(result);
      }
    });
  } catch (err) {
    res.status(400);
  }
};

const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const signToken = (id) => {
  return jwt.sign({ id }, "zoro's 1086 caliber phoenix", { expiresIn: "90d" });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password)
    res.status(400).json({ error: "Please provide email and password" });

  const sqlFind = "SELECT * FROM companies where email=?";
  DB.query(sqlFind, [email], async (err, result) => {
    if (!result || !(await correctPassword(password, result[0].password)))
      return res.status(400).json({ status: "failed" });
    const token = signToken(result[0].companyId);
    res.send(result);
  });
});

exports.protect = catchAsync((req, res, next) => {
  next();
});
