import React from "react";
import classes from "./UserInfo.module.css";
import Button from "./../ButtonComponent/Button";
import { NavLink } from "react-router-dom";

const UserInfo = (props) => {
  const company = props.company;
  return (
    <div className={classes.body}>
      <div className={classes.info}>
        <div className={classes["image-container"]}>
          <img
            alt="Company profile"
            src={company.companyProf}
            className={classes.image}
          />
        </div>
        <div className={classes.userinfo}>
          <p>{company.companyName}</p>
          <p>{company.email}</p>
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <NavLink
          activeClassName={classes.company}
          to={`/admin/users/${company.companyId}`}
        >
          <Button name="bar-chart" btnName="Details"></Button>
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
