import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./UserNavigation.module.css";
import Button from "../../../ButtonComponent/Button";
import { authActions } from "../../../../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UserNavigation = () => {
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
          <NavLink activeClassName={classes.active} to="/user/inventory" exact>
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
          <NavLink activeClassName={classes.active} to="/user/requested" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="cart-sharp"
                ></ion-icon>
              </div>
              <p>Your Orders</p>
            </div>
          </NavLink>
        </li>
        <li className={classes["navigation-tab"]}>
          <NavLink activeClassName={classes.active} to="/user/profile" exact>
            <div className={classes.navs}>
              <div className={classes.icon}>
                <ion-icon
                  className={classes["nav-icon"]}
                  name="newspaper-sharp"
                ></ion-icon>
              </div>
              <p>Profile</p>
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

export default UserNavigation;
