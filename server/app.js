const express = require("express");
const morgan = require("morgan");
const adminOrderRouter = require("./routes/admin_routes/orderRouter");
const adminUserRouter = require("./routes/admin_routes/userRouter");
const adminProductRouter = require("./routes/admin_routes/productRouter");
const userOrderRouter = require("./routes/user_routes/orderRouter");
const userProductRouter = require("./routes/user_routes/productRouter");
const authRouter = require("./routes/authRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", authRouter);
app.use("/admin/login", authRouter);

//User routes
app.use("/users/products", userProductRouter);
app.use("/users/products", userOrderRouter);
app.use("/users/orders", userOrderRouter);

//Admin routes
app.use("/admin/products", adminProductRouter);
app.use("/admin/users", adminUserRouter);
app.use("/admin/orders", adminOrderRouter);
app.use("/users/profile", adminUserRouter);

module.exports = app;
