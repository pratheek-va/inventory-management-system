import React from "react";
import { Redirect, Route } from "react-router-dom";
import LoginForm from "../../../LoginFormComponent/LoginForm";

const LoginNavigation = (props) => {
  const role = props.isCompany ? "user" : "admin";
  return (
    <div>
      <Route>
        <Redirect to={`/${role}/login`} exact />
      </Route>
      <Route path={`/${role}/login`} exact>
        <LoginForm isCompany={props.isCompany}></LoginForm>
      </Route>
    </div>
  );
};

export default LoginNavigation;
