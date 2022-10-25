import React, { useEffect } from "react";
import ListItem from "../../../ListItem/ListItem";
import classes from "./RequestedPage.module.css";
import { useSelector } from "react-redux";

const RequestedPage = () => {
  const orderData = useSelector((state) => state.company.orders);
  console.log(orderData);
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

export default RequestedPage;
