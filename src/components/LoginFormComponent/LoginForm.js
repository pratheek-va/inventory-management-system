import React, { useEffect } from "react";
import "./LoginForm.css";
import Button from "./../ButtonComponent/Button";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import { adminActions } from "../../store/admin";
import Axios from "axios";

const LoginForm = (props) => {
  const isPassword = (value) => value.length > 8;
  const isEmail = (value) => value.includes("@");
  const {
    value: emailValue,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);
  const isCompany = props.isCompany ? props.isCompany : false;

  const dispatch = useDispatch();

  const loginHandler = () => {
    if (isCompany) {
      const loginData = async () => {
        const response = await Axios.post("http://127.0.0.1:8000/users/login", {
          email: emailValue,
          password: password,
        });

        const responseData = response.data;
        console.log(responseData);
        dispatch(authActions.login({ role: "user", data: responseData[0] }));
      };
      loginData();
    } else {
      const loginData = async () => {
        const response = await Axios.post("http://127.0.0.1:8000/admin/login", {
          email: emailValue,
          password: password,
        });

        const responseData = response.data;
        console.log(responseData);
        dispatch(authActions.login({ role: "admin", data: responseData[0] }));
      };
      loginData();
    }
  };

  return (
    <div className="app-body">
      <div className="user__login-form">
        <div className="book">
          <div className="book__form">
            <form action="#" className="form">
              {(isCompany && <h3 className="login-text">Company Login</h3>) || (
                <h3 className="login-text">Employee Login</h3>
              )}
              <div className="form__group">
                <input
                  className="form__input"
                  type="email"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  placeholder="Email Address"
                  id="email"
                  required
                />
                <label for="name" className="form__label">
                  Email Address
                </label>
              </div>

              <div className="form__group">
                <input
                  className="form__input"
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  placeholder="Password"
                  id="password"
                  required
                />
                <label for="email" className="form__label">
                  Password
                </label>
              </div>
              <div className="form__group">
                <div onClick={loginHandler}>
                  <Button btnName="Login" name="log-in-sharp"></Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
