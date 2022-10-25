const mysql = require("mysql");
const DB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "inventoryms",
});

exports.getProducts = async (req, res) => {
  try {
    const sqlGet =
      "select P.productId,P.productName,P.productImage,P.productDesc,P.productPrice,S.availability from products P join stocks S on P.productId=S.productId";
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

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const sqlGet =
      "select C.catName,P.productId,P.productName,P.productImage,P.productDesc,P.productPrice,S.availability from products P join stocks S join categories C on P.productId=S.productId and P.catId=C.catId where P.productId=?;";
    DB.query(sqlGet, [productId], (err, result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};
exports.fetchProduct = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId);
    const sqlGet =
      "select P.productId,P.productName,P.productImage,P.productDesc,P.productPrice,S.availability from products P join stocks S  join orders O on O.productId=P.productId and P.productId=S.productId where P.productId=?;";
    DB.query(sqlGet, [orderId], (err, result) => {
      console.log(err);
      res.send(result);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const availability = req.body.availability;

    const sqlUpdate = "UPDATE stocks SET availability=? WHERE productId=?";
    DB.query(sqlUpdate, [availability, productId], (err, result) => {
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

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const sqlDelete = "DELETE from products where productId=?";
    DB.query(sqlDelete, [productId], (err, result) => {
      res.send(err);
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      productId,
      productName,
      productImage,
      productPrice,
      productDesc,
      catId,
      availability,
    } = req.body;
    const sqlProdlInsert = "INSERT INTO products values(?,?,?,?,?,?);";
    const sqlStockInsert = "INSERT INTO stocks values(?,?)";

    DB.query(
      sqlProdlInsert,
      [
        productId,
        productName,
        productImage,
        productPrice,
        productDesc,
        catId,
        productId,
        availability,
      ],
      (err, result) => {
        console.log(err);
        res.send(result);
      }
    );
    DB.query(sqlStockInsert, [productId, availability]);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
