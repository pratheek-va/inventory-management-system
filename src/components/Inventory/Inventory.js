import React, { useEffect } from "react";
import Item from "../Item/Item";
import { NavLink } from "react-router-dom";
import classes from "./Inventory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../store/admin";

const Inventory = (props) => {
  const data = useSelector((state) => state.admin.items);
  const catId = useSelector((state) => state.admin.categoryId);

  const dispatch = useDispatch();

  const products =
    catId !== ""
      ? data.filter((product) => product.categoryId === catId)
      : data;

  const catValueChangeHandler = (event) => {
    dispatch(adminActions.changeCategory(event.target.value));
  };

  return (
    <div className={classes.body}>
      <div className={classes["category-bar"]}>
        <div className={classes["form-group"]}>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="apps"></ion-icon>
                </div>
              </div>

              <select
                id="cars"
                value={catId}
                onChange={catValueChangeHandler}
                className={classes["form-control"]}
              >
                <option value="">Select Category</option>
                <option value="CAT001">Category 1</option>
                <option value="CAT002">Category 2</option>
                <option value="CAT003">Category 3</option>
                <option value="CAT004">Category 4</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.container}>
        {products.map((item) => (
          <NavLink
            activeClassName={classes.item}
            to={`/${props.role}/inventory/${item.productId}`}
          >
            <Item
              key={item.productId}
              id={item.productId}
              name={item.productName}
              price={item.productPrice}
              image={item.productImage}
            ></Item>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
