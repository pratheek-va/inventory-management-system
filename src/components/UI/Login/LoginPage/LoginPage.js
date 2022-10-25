import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import "./../../../../utilities/utilities.css";
import AppHeader from "../../../AppHeader/AppHeader";
import LoginForm from "../../../LoginFormComponent/LoginForm";
import LoginNavigation from "../LoginNavigation/LoginNavigation";

const LoginPage = () => {
  const [isCompany, setIsCompany] = useState(true);
  const [selectedUser, setSelectedUser] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(false);
  // const role = prompt("Enter the role");

  const selectHandler = () => {
    if (!selectedAdmin) {
      setSelectedAdmin(true);
      setSelectedUser(false);
      setIsCompany(false);
    } else {
      setSelectedAdmin(false);
      setSelectedUser(true);
      setIsCompany(true);
    }
  };

  return (
    <div>
      <header className={styles["app__header"]}>
        <AppHeader></AppHeader>

        <nav className={styles["app__header__component2"]}>
          <div
            className={styles["user-auth"]}
            onClick={selectedUser ? undefined : selectHandler}
          >
            <h3>Company</h3>
          </div>
          <div
            className={styles["admin-auth"]}
            onClick={selectedAdmin ? undefined : selectHandler}
          >
            <h3>Employee</h3>
          </div>
        </nav>
        <div className={styles["tab-border"]}>
          <div
            className={`${
              selectedAdmin ? styles["selected-admin"] : styles["selected-user"]
            }`}
          ></div>
        </div>
      </header>
      {/* <LoginForm ></LoginForm> */}
      <LoginNavigation isCompany={isCompany}></LoginNavigation>
    </div>
  );
};

export default LoginPage;
