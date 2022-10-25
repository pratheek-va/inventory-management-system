import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const sizeFactor = props.sizeFactor ? props.sizeFactor : 1;
  return (
    <div
      className={classes["button-order"]}
      style={{
        fontSize: `${1.6 * sizeFactor}rem`,
      }}
    >
      <div
        className={classes["order-button"]}
        style={{
          width: `${20 * sizeFactor}rem`,
          height: `${5.5 * sizeFactor}rem`,
        }}
      >
        <div className={classes["button-text"]}>
          <span
            className={classes.cart}
            style={{
              fontSize: `${3 * sizeFactor}rem`,
            }}
          >
            <ion-icon name={props.name}></ion-icon>{" "}
          </span>
          <span>{props.btnName}</span>
        </div>
      </div>
    </div>
  );
};

export default Button;
