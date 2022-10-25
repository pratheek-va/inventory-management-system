import React, { useEffect } from "react";
import classes from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isAdmin = params.companyId ? true : false;
  const adminCompanyData = useSelector((state) => state.admin.company);
  const profileData = useSelector((state) => state.auth.loggedInUser);

  const company = isAdmin ? adminCompanyData : profileData;

  useEffect(() => {
    const getData = async () => {
      if (isAdmin) {
        const response = await Axios.get(
          `http://127.0.0.1:8000/admin/users/${params.companyId}`
        );
        const responseData = response.data;
        console.log(responseData);
        dispatch(adminActions.setCompany(responseData[0]));
      }
    };
    getData();
  }, [dispatch, isAdmin, params.companyId]);

  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <div className={classes.profile}>
          <div className={classes["profile-photo"]}>
            <img className={classes.image} src={company.companyProf} />
          </div>
          <div className={classes["profile-info"]}>
            <p className={classes["profile-name"]}>{company.companyName}</p>
            <p className={classes["profile-email"]}>{company.email}</p>
            <p className={classes["join-date"]}>{`Joined since ${new Date(
              company.joinDate
            ).toLocaleString("default", {
              month: "short",
            })} ${new Date(company.joinDate).getDate()}, ${new Date(
              company.joinDate
            ).getFullYear()}`}</p>
          </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes["user-details"]}>
          <div className={classes["user-info"]}>
            <div className={classes["user-info-1"]}>
              <p className={classes["user-info-tag"]}>Total products Bought</p>
              <p className={classes["user-info-value"]}>
                {company.totalProductsBought}
              </p>
            </div>
            <div className={classes["user-info-2"]}>
              <p className={classes["user-info-tag"]}>Total Money Spent</p>
              <p className={classes["user-info-value"]}>
                ₹{company.totalMoneySpent}
              </p>
            </div>
          </div>
          <div className={classes["user-info"]}>
            <div className={classes["user-info-3"]}>
              <p className={classes["user-info-tag"]}>cotact</p>
              <p className={classes["user-info-value"]}>{company.contactNum}</p>
            </div>
            <div className={classes["user-info-3"]}>
              <p className={classes["user-info-tag"]}>Website</p>
              <p
                className={classes["user-info-value"]}
                style={{ textTransform: "lowercase" }}
              >
                {company.website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
