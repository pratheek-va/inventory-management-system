import Button from "./../ButtonComponent/Button";
import React, { useEffect } from "react";
import classes from "./ListItem.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/admin";
import Axios from "axios";

const ListItem = (props) => {
  let status;
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const order = props.order;

  const approveHandler = async () => {
    const response = await Axios.patch(
      `http://127.0.0.1:8000/admin/orders/${order.orderId}`,
      {
        status: 1,
      }
    );
    console.log(response);
    if (response.status === 200) alert("Order approved");
  };

  return (
    <div className={classes.body}>
      <div className={classes.information}>
        <div className={classes["image-container"]}>
          <img src={order.productImage} className={classes.image} />
        </div>
        <div className={classes["information-text"]}>
          <p>{order.productName}</p>
          <p>
            Ordered on{" "}
            <span className={classes["order-info"]}>
              {" "}
              {`${new Date(order.orderDate).getDay()}/${
                new Date(order.orderDate).getMonth() + 1
              }/${new Date(order.orderDate).getFullYear()}
                    `}
            </span>{" "}
            by{" "}
            <span className={classes["order-info"]}>{order.companyName}</span>
          </p>
          <p>
            Order Id:{" "}
            <span className={classes["order-info"]}>{order.orderId}</span>
          </p>
          <p>Quantity: {order.orderQuantity}</p>
          {!isAdmin && (
            <p>
              Status:{" "}
              {(order.status === 0 && (
                <span className={classes.status}>Pending approval</span>
              )) ||
                (order.status === 1 && (
                  <span className={classes.status} style={{ color: "green" }}>
                    Approved
                  </span>
                ))}
            </p>
          )}
        </div>
      </div>
      <div className={classes["order-price-details"]}>
        <p>Total Price</p>
        <p className={classes["order-price"]}>₹{order.orderPrice}</p>
      </div>

      <div className={classes.button}>
        <NavLink
          activeClassName={classes.item}
          to={`/${
            isAdmin
              ? `admin/requests/${order.orderId}`
              : `user/inventory/${order.productId}`
          }`}
        >
          <Button name="bar-chart" btnName="details" sizeFactor={0.9}></Button>
        </NavLink>

        {isAdmin && (
          <div className={classes.btn} onClick={approveHandler}>
            <Button
              name="checkmark-circle-outline"
              btnName="approve"
              sizeFactor={0.9}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
