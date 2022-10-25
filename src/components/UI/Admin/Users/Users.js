import React, { useEffect } from "react";
import UserInfo from "../../../UserInfo/UserInfo";
import classes from "./Users.module.css";
import { useSelector } from "react-redux";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";

const Users = (props) => {
  const companies = useSelector((state) => state.admin.companies);

  return (
    <div className={classes.body}>
      {companies.map((company) => (
        <UserInfo key={company.companyId} company={company}></UserInfo>
      ))}
    </div>
  );
};

export default Users;
