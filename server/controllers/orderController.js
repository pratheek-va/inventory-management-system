const mysql = require("mysql");

const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventoryms",
});

exports.getOrders = async (req, res) => {
  try {
    const sqlGet =
      "SELECT O.orderQuantity,O.orderId,O.orderDate,O.orderPrice,O.status,C.companyName,P.productId,P.productName,P.productImage from products P,orders O, companies C where O.productId=P.productId and O.companyId=C.companyId";
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

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.companyId;
    console.log(req.params.companyId);
    const sqlGet =
      "SELECT O.orderQuantity,O.orderId,O.orderDate,O.orderPrice,O.status,C.companyName,P.productId,P.productName,P.productImage from products P,orders O, companies C where O.productId=P.productId and O.companyId=C.companyId and C.companyId=?";
    DB.query(sqlGet, [userId], (err, result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const sqlGet =
      "SELECT A.catName,P.productId,P.productDesc,O.orderId,S.availability,O.orderQuantity,O.orderDate,O.orderPrice,O.status,C.companyName, P.productName,P.productImage from products P,orders O, companies C,stocks S,categories A where O.productId=P.productId and O.companyId=C.companyId and P.productId=S.productId and O.orderId=?";
    DB.query(sqlGet, [orderId], (err, result) => {
      console.log(err, result);
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;
    const sqlUpdate = "UPDATE orders SET status=? where orderId=?";
    DB.query(sqlUpdate, [status, orderId], (err, result) => {
      console.log(err);
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.declineOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const sqlUpdate = "UPDATE orders SET status=2 where order_id=?";
    DB.query(sqlUpdate, [orderId], (err, result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const {
      orderId,
      companyId,
      productId,
      status,
      orderDate,
      orderQuantity,
      orderPrice,
    } = req.body;
    const sqlInsert = "INSERT INTO orders values(?,?,?,?,?,?,?);";
    DB.query(
      sqlInsert,
      [
        orderId,
        companyId,
        productId,
        status,
        orderDate,
        orderQuantity,
        orderPrice,
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
