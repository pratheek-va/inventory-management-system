import React from "react";
import classes from "./Item.module.css";

const Item = (props) => {
  return (
    <div className={classes.body}>
      <img className={classes.image} alt="Product image" src={props.image} />
      <div className={classes["item-details"]}>
        <p className={classes["item-name"]}>
          <span className={classes.attribute}>Material Id: </span>
          {props.id}
        </p>
        <p className={classes["item-name"]}>
          <span className={classes.attribute}>Material Name: </span>
          {props.name}
        </p>
        <p className={classes["item-name"]}>
          <span className={classes.attribute}>Stocks Available: </span>
          {props.available}
        </p>
        <p className={classes["item-name"]}>
          <span className={classes.attribute}>Price: </span>
          {props.price}
        </p>
      </div>
    </div>
  );
};

export default Item;
