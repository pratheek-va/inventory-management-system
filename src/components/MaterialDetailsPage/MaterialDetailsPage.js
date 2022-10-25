import Button from "./../ButtonComponent/Button";
import { NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classes from "./MaterialDetailsPage.module.css";
import { useSelector } from "react-redux";
import { companyActions } from "../../store/company";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/admin";
import "react-activity/dist/Levels.css";
import { Levels } from "react-activity";
import Axios from "axios";
import { authActions } from "../../store/auth";

const MaterialDetailsPage = (props) => {
  let [quantity, setQuantity] = useState(0);

  const company = useSelector((state) => state.auth.loggedInUser);
  const orders = useSelector((state) => state.admin.orders);
  const order = useSelector((state) => state.admin.order);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const product = useSelector((state) => state.admin.product);

  const dispatch = useDispatch();
  const params = useParams();

  const lastOrder = orders.at(-1);
  const isAdminOrdPage = isAdmin && params.orderId ? true : false;
  const isUserOrdPage = !isAdmin && params.orderId ? true : false;

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

  useEffect(() => {
    const getData = async () => {
      if (params.materialId) {
        const response = await Axios.get(
          `http://127.0.0.1:8000/admin/products/${params.materialId}`
        );

        const responseData = response.data[0];
        dispatch(adminActions.setProduct(responseData));

        // setIsLoading(false);
      } else {
        const response = await Axios.get(
          `http://127.0.0.1:8000/admin/orders/${params.orderId}`
        );

        const responseData = response.data[0];
        console.log(response.data);

        dispatch(adminActions.setOrder(responseData));
      }
    };
    getData();
  }, []);

  const [activeDetails, setActiveDetails] = useState(true);
  const [activeDescription, setActiveDescription] = useState(false);

  const [x, setX] = useState(100);
  const [y, setY] = useState(0);
  const avalQuantity = product.availability;
  const amount = product.productPrice * quantity;

  const increment = () => {
    if (quantity < avalQuantity) setQuantity((quantity += 1));
  };

  const decrement = () => {
    if (quantity > 0) setQuantity((quantity -= 1));
  };

  const detailHandler = () => {
    setActiveDetails(true);
    setActiveDescription(false);
    setY(0);
    setX(100);
  };

  const descriptionHandler = () => {
    setActiveDetails(false);
    setActiveDescription(true);
    setY(-100);
    setX(0);
  };

  const createOrderId = () => {
    let num;
    if (lastOrder)
      num = String(Number.parseInt(lastOrder.orderId.slice(-3)) + 1);
    else num = "1";
    return "ORD" + num.padStart(4, "0");
  };

  const orderHandler = async () => {
    const date = new Date();
    const order = {
      orderId: createOrderId(),
      companyId: company.companyId,
      productId: product.productId,
      status: 0,
      orderDate: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      orderQuantity: quantity,
      orderPrice: amount,
    };
    const response = await Axios.post(
      `http://127.0.0.1:8000/users/products/${params.materialId}`,
      order
    );
    if (response.status === 200) alert("Order placed");
    dispatch(adminActions.addOrder(order));
    dispatch(companyActions.placeOrder(order));

    Axios.patch(`http://127.0.0.1:8000/users/products/${params.materialId}`, {
      availability: product.availability - quantity,
    });

    Axios.patch(`http://127.0.0.1:8000/users/profile/${company.companyId}`, {
      totalProductsBought: company.totalProductsBought + 1,
      totalMoneySpent: company.totalMoneySpent + amount,
    });
    console.log(company.totalProductsBought + 1);
    dispatch(
      authActions.updateCompany({
        totalProductsBought: company.totalProductsBought + 1,
        totalMoneySpent: company.totalMoneySpent + amount,
      })
    );
    dispatch(
      adminActions.updateProduct({
        productId: product.productId,
        availability: product.availability - quantity,
      })
    );
  };

  const deleteHandler = async () => {
    await Axios.delete(
      `http://127.0.0.1:8000/admin/products/${params.materialId}`
    );
    dispatch(adminActions.deleteProduct(params.materialId));
  };

  return (
    <div className={classes.body}>
      <div className={classes.information}>
        <div className={classes["image-section"]}>
          <div className={classes.image}>
            <img
              src={
                params.materialId ? product.productImage : order.productImage
              }
              alt="item-image"
              className={classes["item-image"]}
            />
          </div>
        </div>
        <div className={classes["details-section"]}>
          <div className={classes.name}>
            <h2>
              {params.materialId ? product.productName : order.productName}
            </h2>
            <p>product.model</p>
          </div>
          <div className={classes["item-value"]}>
            <div className={classes.price}>
              <p className={classes["item-value__title"]}>
                {isAdmin && isAdminOrdPage ? "Total Price" : "Price"}
              </p>
              <p className={classes["price-value"]}>
                ₹
                {isAdmin && isAdminOrdPage
                  ? order.orderPrice
                  : product.productPrice}
              </p>
            </div>
            {!isAdmin && (
              <div className={classes.quantity}>
                <p className={classes["item-value__title"]}>Quantity</p>
                <div className={classes["quantity-value"]}>
                  <button
                    className={classes["quantity-change"]}
                    onClick={decrement}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className={classes["quantity-change"]}
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            {isAdmin && isAdminOrdPage && (
              <div className={classes["ord-details"]}>
                <p className={classes["item-value__title"]}>Ordered by</p>
                <div className={classes["details"]}>
                  <p>
                    <span className={classes["ord-text"]}>
                      {order.companyName}
                    </span>{" "}
                    <span style={{ textTransform: "lowercase" }}>on</span>{" "}
                    {`${new Date(order.orderDate).getDate()}/${
                      new Date(order.orderDate).getMonth() + 1
                    }/${new Date(order.orderDate).getFullYear()}
                    `}
                  </p>
                  <p>
                    Order Id:{" "}
                    <span className={classes["ord-text"]}>{order.orderId}</span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className={classes["ord-text"]}>
                      {params.materialId
                        ? product.availability
                        : order.orderQuantity}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={classes["detail-desc"]}>
            <div className={classes["de-header"]}>
              <span
                className={`${activeDetails ? classes.active : ""}`}
                onClick={detailHandler}
              >
                Description
              </span>
              <span
                className={`${activeDescription ? classes.active : ""}`}
                onClick={descriptionHandler}
              >
                Details
              </span>
            </div>
            <div className={classes["products-details-section"]}>
              <div
                className={classes.details}
                style={{ transform: `translateX(${y}%)` }}
              >
                <p>
                  {params.materialId ? product.productDesc : order.productDesc}
                </p>
              </div>
              <div
                className={classes.description}
                style={{ transform: `translateX(${x}%) translateY(-100%)` }}
              >
                <p>
                  Product Id:{" "}
                  {params.materialId ? product.productId : order.productId}
                </p>
                <p>
                  Category name:{" "}
                  {params.materialId ? product.catName : order.catName}
                </p>
                <p>
                  Available:{" "}
                  {params.materialId
                    ? product.availability
                    : order.availability}
                </p>
              </div>
            </div>
          </div>
          <div className={classes["order-item"]}>
            {!isAdmin && !isAdminOrdPage && (
              <div style={{ display: "flex", flex: 1 }}>
                <div className={classes["total-price"]}>
                  <p>Total price</p>
                  <p>₹{amount}</p>
                </div>
                <div
                  style={{ flex: 1, alignSelf: "flex-end" }}
                  onClick={orderHandler}
                >
                  <Button name="cart" btnName="Order"></Button>
                </div>
              </div>
            )}
            {(isAdmin && !isAdminOrdPage && (
              <div className={classes["button-container"]}>
                <div className={classes.button}>
                  <NavLink to={`/admin/products/${product.productId}`}>
                    <Button name="arrow-up-circle" btnName="update"></Button>
                  </NavLink>
                </div>
                <div className={classes.button}>
                  <div onClick={deleteHandler}>
                    <NavLink to={`/admin/inventory`}>
                      <Button name="trash-bin" btnName="delete"></Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )) ||
              (isAdmin && isAdminOrdPage && order.status === 0 && (
                <div className={classes["button-container"]}>
                  <div className={classes.button} onClick={approveHandler}>
                    <Button
                      name="checkmark-circle-outline"
                      btnName="approve"
                    ></Button>
                  </div>
                </div>
              )) ||
              (isAdmin && isAdminOrdPage && order.status === 1 && (
                <div className={classes["button-container-approved"]}>
                  <div className={classes.button}>
                    <Button
                      name="checkmark-circle-outline"
                      btnName="approve"
                    ></Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailsPage;
