const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventoryms",
});

exports.encryptPassword = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 12);
  next();
};

exports.getUsers = async (req, res) => {
  try {
    const sqlGet = "SELECT * from companies";
    DB.query(sqlGet, (err, result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sqlGet = "SELECT * from companies where companyId=?";
    DB.query(sqlGet, [userId], (err, result) => {
      console.log(result);
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { totalProductsBought, totalMoneySpent } = req.body;
    console.log(companyId);
    const sqlUpdate =
      "UPDATE companies SET totalProductsBought=?,totalMoneySpent=? WHERE companyId=?";
    DB.query(
      sqlUpdate,
      [totalProductsBought, totalMoneySpent, companyId],
      (err, result) => {
        console.log(err);
        res.send(result);
      }
    );
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const productId = req.params.productId;
    const sqlDelete = "DELETE from products where product_id=?";
    DB.query(sqlDelete, [productId], (err, result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      companyId,
      companyName,
      companyProf,
      contactNum,
      email,
      password,
      totalProductsBrought,
      totalMoneySpent,
      website,
      joinDate,
    } = req.body;

    const token = jwt.sign({ id: companyId }, "zoro's 1086 caliber phoenix", {
      expiresIn: "90d",
    });

    console.log(req.body);
    const sqlInsert = "INSERT INTO companies values(?,?,?,?,?,?,?,?,?,?);";
    DB.query(
      sqlInsert,
      [
        companyId,
        companyName,
        companyProf,
        contactNum,
        email,
        password,
        totalProductsBrought,
        totalMoneySpent,
        website,
        joinDate,
      ],
      (err, result) => {
        console.log(err);
        res.send(result);
      }
    );
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
