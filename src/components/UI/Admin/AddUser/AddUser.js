import React from "react";
import classes from "./AddUser.module.css";
import useInput from "../../../../hooks/use-input";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Axios from "axios";

const isEmailAddress = (value) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return value.match(pattern) != null;
};
const isNotEmpty = (value) => value.trim() !== "";
const isPassword = (value) => value.length >= 8;
const isNumber = (value) => {
  const pattern = /[0-9]{10}/;
  return value.match(pattern) != null;
};
const isWebsite = (value) => value.includes("www.");
const isProfilePic = (value) => value.includes("/");

const AddUser = () => {
  const dispatch = useDispatch();

  const lastCompany = useSelector((state) => state.admin.companies.at(-1));
  const createID = () => {
    let num;
    if (lastCompany)
      num = String(Number.parseInt(lastCompany.companyId.slice(-3)) + 1);
    else num = "1";
    return "COMP" + num.padStart(3, "0");
  };
  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);

  const {
    value: websiteValue,
    isValid: websiteIsValid,
    hasError: websiteHasError,
    valueChangeHandler: websiteChangeHandler,
    inputBlurHandler: websiteBlurHandler,
    reset: resetWebsite,
  } = useInput(isWebsite);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const isPasswordMatches = (value) => value === passwordValue;
  const {
    value: consfirmPasswordValue,
    isValid: consfirmPasswordIsValid,
    hasError: consfirmPasswordHasError,
    valueChangeHandler: consfirmPasswordChangeHandler,
    inputBlurHandler: consfirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(isPasswordMatches);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmailAddress);

  const {
    value: contactValue,
    isValid: contactIsValid,
    hasError: contactHasError,
    valueChangeHandler: contactChangeHandler,
    inputBlurHandler: contactBlurHandler,
    reset: resetContact,
  } = useInput(isNumber);

  const {
    value: profilePicValue,
    isValid: profilePicValueIsValid,
    hasError: profilePicValueHasError,
    valueChangeHandler: profilePicChangeHandler,
    inputBlurHandler: profilePicBlurHandler,
    reset: resetProfilePic,
  } = useInput(isProfilePic);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      !fullNameIsValid &&
      !emailIsValid &&
      !passwordIsValid &&
      !consfirmPasswordIsValid &&
      !contactIsValid
    )
      return;
    const companyId = createID();
    const date = new Date();
    const company = {
      companyId: companyId,
      companyName: fullNameValue,
      companyProf: profilePicValue,
      contactNum: contactValue,
      email: emailValue,
      password: passwordValue,
      website: websiteValue,
      totalProductsBrought: 0,
      totalMoneySpent: 0,
      joinDate: `${date.getFullYear()}-${date.getMonth() + 1}-${
        date.getDay() + 1
      }`,
    };

    const addCompany = async () => {
      const response = await Axios.post(
        "http://127.0.0.1:8000/admin/users/register",
        {
          companyId: companyId,
          companyName: fullNameValue,
          companyProf: profilePicValue,
          contactNum: contactValue,
          email: emailValue,
          password: passwordValue,
          website: websiteValue,
          totalProductsBrought: 0,
          totalMoneySpent: 0,
          joinDate: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        }
      );
      console.log(await response.data);
      dispatch(adminActions.addCompany(company));
    };
    addCompany();
    resetFullName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
    resetContact();
    resetWebsite();
    resetProfilePic();
  };

  return (
    <div className={`${classes.container}`}>
      <form
        className={classes["form-horizontal"]}
        method="post"
        id="contact_form"
      >
        <div className={classes["input-header"]}>
          <h2>Company Registration</h2>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Full Name</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>
              <input
                name="full_name"
                placeholder="Full Name"
                className={classes["form-control"]}
                type="text"
                value={fullNameValue}
                onChange={fullNameChangeHandler}
                onBlur={fullNameBlurHandler}
              />
            </div>
            {fullNameHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Website</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>
              <input
                name="full_name"
                placeholder="Full Name"
                className={classes["form-control"]}
                type="text"
                value={websiteValue}
                onChange={websiteChangeHandler}
                onBlur={websiteBlurHandler}
              />
            </div>
            {websiteHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Email</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="mail"></ion-icon>
                </div>
              </div>
              <input
                name="email"
                placeholder="Email"
                className={classes["form-control"]}
                type="email"
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </div>
            {emailHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Password</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="lock-closed"></ion-icon>
                </div>
              </div>
              <input
                name="password"
                placeholder="Password"
                className={classes["form-control"]}
                type="password"
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
            </div>
            {passwordHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Confirm Password</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="lock-closed"></ion-icon>
                </div>
              </div>
              <input
                name="confirm_password"
                placeholder="Confirm Password"
                className={classes["form-control"]}
                type="password"
                value={consfirmPasswordValue}
                onChange={consfirmPasswordChangeHandler}
                onBlur={consfirmPasswordBlurHandler}
              />
            </div>
            {consfirmPasswordHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Contact No.</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="call"></ion-icon>
                </div>
              </div>
              <input
                name="contact"
                placeholder="(639)"
                className={classes["form-control"]}
                type="text"
                value={contactValue}
                onChange={contactChangeHandler}
                onBlur={contactBlurHandler}
              />
            </div>
            {contactHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>
            Company profile photo
          </label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="call"></ion-icon>
                </div>
              </div>
              <input
                name="profilepic"
                placeholder="Profile URL"
                className={classes["form-control"]}
                type="text"
                value={profilePicValue}
                onChange={profilePicChangeHandler}
                onBlur={profilePicBlurHandler}
              />
            </div>
            {profilePicValueHasError && (
              <p className={classes.error}>Enter the valid input</p>
            )}
          </div>
        </div>

        {false && (
          <div class="alert alert-success" role="alert" id="success_message">
            Success <i class="glyphicon glyphicon-thumbs-up"></i> Success!.
          </div>
        )}

        <div className={classes["form-group"]}>
          <button
            type="submit"
            className={classes.submit}
            onClick={formSubmissionHandler}
          >
            SUBMIT <span className="glyphicon glyphicon-send"></span>
          </button>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
};

export default AddUser;
