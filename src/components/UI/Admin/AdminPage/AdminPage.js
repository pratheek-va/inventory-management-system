import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import UserProfile from "../../User/UserProfile/UserProfile";
import classes from "./AdminPage.module.css";
import AdminNavigation from "../AdminNavigation/AdminNavigation";
import AppHeader from "../../../AppHeader/AppHeader";
import AddUser from "../AddUser/AddUser";
import AdminOrderPage from "../AdminOrdersPage/AdminOrdersPage";
import Inventory from "./../../../Inventory/Inventory";
import Users from "../Users/Users";
import MaterialDetailsPage from "../../../MaterialDetailsPage/MaterialDetailsPage";
import AddProduct from "../AddProduct/AddProduct";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";
import Axios from "axios";

const AdminPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveProducts = async () => {
      const response = await fetch("/admin/products", {
        method: "GET",
      });
      const responseData = await response.json();
      console.log(responseData);
      dispatch(adminActions.retrieveProduct(responseData));
    };
    const retrieveOrders = async () => {
      const response = await Axios.get(`http://127.0.0.1:8000/admin/orders`);
      const responseData = await response.data;
      console.log(responseData);
      dispatch(adminActions.retrieveOrders(responseData));
    };
    const retrieveCompanies = async () => {
      const response = await fetch("http://localhost:8000/admin/users", {
        method: "GET",
      });
      const responseData = await response.json();

      console.log(responseData);
      dispatch(adminActions.retrieveCompanies(responseData));
    };

    retrieveCompanies();
    retrieveOrders();
    retrieveProducts();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <AppHeader></AppHeader>
      <div className={classes["app-body"]}>
        <AdminNavigation></AdminNavigation>
        <div className={classes.body}>
          <Route>
            <Redirect to="/admin/inventory" exact />
          </Route>
          <Route path="/admin/inventory" exact>
            <Inventory role="admin"></Inventory>
          </Route>
          <Route path="/admin/add-product" exact>
            <AddProduct></AddProduct>
          </Route>
          <Route path="/admin/add-user" exact>
            <AddUser></AddUser>
          </Route>
          <Route path="/admin/orders" exact>
            <AdminOrderPage></AdminOrderPage>
          </Route>
          <Route path="/admin/users" exact>
            <Users></Users>
          </Route>
          <Route path="/admin/inventory/:materialId" exact>
            <MaterialDetailsPage></MaterialDetailsPage>
          </Route>
          <Route path="/admin/users/:companyId" exact>
            <UserProfile></UserProfile>
          </Route>
          <Route path="/admin/requests/:orderId" exact>
            <MaterialDetailsPage></MaterialDetailsPage>
          </Route>
          <Route path="/admin/products/:productId" exact>
            <AddProduct></AddProduct>
          </Route>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
