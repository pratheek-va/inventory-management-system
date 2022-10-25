import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import classes from "./UserPage.module.css";
import UserNavigation from "../UserNavigation/UserNavigation";
import AppHeader from "../../../AppHeader/AppHeader";
import RequestedPage from "../UserOrdersPage/RequestedPage";
import Inventory from "./../../../Inventory/Inventory";
import UserProfile from "../UserProfile/UserProfile";
import { adminActions } from "../../../../store/admin";
import MaterialDetailsPage from "../../../MaterialDetailsPage/MaterialDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../../../store/company";
import Axios from "axios";

const UserPage = () => {
  const user = useSelector((state) => state.auth.loggedInUser);

  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveProducts = async () => {
      const response = await fetch("http://localhost:8000/admin/products", {
        method: "GET",
      });
      const responseData = await response.json();

      dispatch(adminActions.retrieveProduct(responseData));
    };

    const retrieveOrders = async () => {
      console.log(user.companyId);
      const response = await Axios.get(
        `http://127.0.0.1:8000/users/orders/c/${user.companyId}`
      );
      const responseData = await response.data;

      dispatch(companyActions.retrieveOrders(responseData));
    };
    const retrieveAllOrders = async () => {
      const response = await Axios.get(`http://127.0.0.1:8000/admin/orders`);
      const responseData = await response.data;

      dispatch(adminActions.retrieveOrders(responseData));
    };
    retrieveProducts();
    retrieveOrders();
    retrieveAllOrders();
  }, []);

  return (
    <React.Fragment>
      <AppHeader></AppHeader>
      <div className={classes["app-body"]}>
        <UserNavigation></UserNavigation>
        <div className={classes.body}>
          <Route>
            <Redirect to="/user/inventory" exact />
          </Route>
          <Route path="/user/inventory" exact>
            <Inventory role="user"></Inventory>
          </Route>
          <Route path="/user/requested" exact>
            <RequestedPage></RequestedPage>
          </Route>
          <Route path="/user/profile" exact>
            <UserProfile></UserProfile>
          </Route>
          <Route path="/user/inventory/:materialId" exact>
            <MaterialDetailsPage></MaterialDetailsPage>
          </Route>
          <Route path="/user/requests/:orderId" exact>
            <MaterialDetailsPage></MaterialDetailsPage>
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
