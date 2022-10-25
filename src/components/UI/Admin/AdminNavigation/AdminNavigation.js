import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../ButtonComponent/Button";
import classes from "./AdminNavigation.module.css";
import { authActions } from "../../../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const AdminNavigation = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const role = isAdmin ? "admin" : "user";
  const logoutHandler = () => {
    dispatch(authActions.logout(role));
  };
  return (
    <div className={classes.body}>
      <ul className={classes.navigation}>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/admin/inventory" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="albums-sharp"
                ></ion-icon>
              </div>
              <p>Inventory</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/admin/orders" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="newspaper"
                ></ion-icon>
              </div>
              <p>Orders</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink
            activeClassName={classes.active}
            to="/admin/add-product"
            exact
          >
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="briefcase"
                ></ion-icon>
              </div>
              <p>Add Product</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/admin/add-user" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="person"
                ></ion-icon>
              </div>
              <p>Add Company</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/admin/users" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="server"
                ></ion-icon>
              </div>
              <p>Companies</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/admin/users" exact>
            <div className={classes.logout} onClick={logoutHandler}>
              <Button btnName="logout" sizeFactor={0.8} name="power"></Button>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavigation;
