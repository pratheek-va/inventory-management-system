import React, { useEffect } from "react";
import ListItem from "../../../ListItem/ListItem";
import classes from "./AdminOrdersPage.module.css";
import { useSelector } from "react-redux";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";

// const orderData = [
//   {
//     orderId: 797593729,
//     companyId: 57937593,
//     productId: "10io",
//     quantity: 4,
//     price: 1499,
//     status: false,
//     orderDate: "749793",
//   },
//   {
//     orderId: 797593727,
//     companyId: 57937567,
//     productId: "10io",
//     quantity: 4,
//     price: 1388,
//     status: false,
//     orderDate: "74555",
//   },
// ];

const RequestPage = () => {
  const orderData = useSelector((state) => state.admin.orders);

  return (
    <div className={classes.body}>
      <div className={classes.requests}>
        {orderData.map((order) => (
          <ListItem order={order}></ListItem>
        ))}
      </div>
    </div>
  );
};

export default RequestPage;
