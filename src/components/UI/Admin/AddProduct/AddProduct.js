import React from "react";
import classes from "./AddProduct.module.css";
import useInput from "../../../../hooks/use-input";
import { adminActions } from "../../../../store/admin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";

const isNotEmpty = (value) => value.trim() !== "";
const isDescription = (value) => value.length <= 200;
const isAvailable = (value) => Number(value) >= 0;
const isPrice = (value) => Number(value) >= 0;
const isUrl = (value) => value.includes("/");

const AddProduct = () => {
  let index;
  let product;
  let stock;

  const dispatch = useDispatch();
  const params = useParams();

  const productId = params.productId ? params.productId : null;

  const products = useSelector((state) => state.admin.items);
  const productStocks = useSelector((state) => state.admin.stocks);

  const lastProduct = products.at(-1);

  const createID = (name) => {
    let num;
    if (lastProduct)
      num = String(Number.parseInt(lastProduct.productId.slice(-3)) + 1);
    else num = "1";
    return "PROD" + num.padStart(3, "0");
  };

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descripionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isDescription);

  const {
    value: categoryId,
    isValid: catIdValueIsValid,
    hasError: catIdValueHasError,
    valueChangeHandler: catValueChangeHandler,
    reset: resetCatValue,
  } = useInput(isAvailable);
  const {
    value: available,
    isValid: availableValueIsValid,
    hasError: avaValueHasError,
    valueChangeHandler: avaValueChangeHandler,
    inputBlurHandler: avaValueBlurHandler,
    reset: resetAvalValue,
  } = useInput(isAvailable);

  const {
    value: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isPrice);

  const {
    value: imageUrlValue,
    isValid: imageUrlValueIsValid,
    hasError: imageUrlValueHasError,
    valueChangeHandler: imageUrlValueChangeHandler,
    inputBlurHandler: imageUrlValueBlurHandler,
    reset: resetImageUrl,
  } = useInput(isUrl);

  if (productId) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === productId) {
        index = i;
        stock = productStocks[i];
        product = products[i];
      }
    }
  }

  const resetFields = () => {
    resetName();
    resetDescription();
    resetCatValue();
    resetPrice();
    resetImageUrl();
    resetAvalValue();
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !nameIsValid &&
      !descriptionIsValid &&
      !catIdValueIsValid &&
      !priceIsValid &&
      !imageUrlValueIsValid &&
      !availableValueIsValid
    )
      return;

    const productId = createID(nameValue);

    const addProduct = async () => {
      const response = await Axios.post(
        "http://127.0.0.1:8000/admin/products/add-product",
        {
          productId,
          productName: nameValue,
          productImage: imageUrlValue,
          productPrice: price,
          productDesc: descriptionValue,
          catId: categoryId,
          availability: available,
        }
      );
    };
    addProduct();
    dispatch(
      adminActions.addProduct([
        {
          productId,
          productName: nameValue,
          procuctDesc: descriptionValue,
          productPrice: price,
          productImage: imageUrlValue,
          categoryId,
        },
        { productId, available },
      ])
    );
    console.log({
      productId,
      productName: nameValue,
      procuctDesc: descriptionValue,
      productPrice: price,
      productImage: imageUrlValue,
      categoryId,
    });

    resetFields();
  };

  const updateHandler = (event) => {
    event.preventDefault();
    resetFields();
    dispatch(
      adminActions.updateProduct([
        index,
        {
          productId,
          productName: nameValue,
          productDesc: descriptionValue,
          productPrice: price,
          productImage: imageUrlValue,
          categoryId,
        },
        { productId, available },
      ])
    );
  };

  return (
    <div className={`${classes.container}`}>
      <form
        className={classes["form-horizontal"]}
        method="post"
        id="contact_form"
      >
        <div className={classes["input-header"]}>
          <h2>Product Registration</h2>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Name</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="cube"></ion-icon>
                </div>
              </div>
              <input
                name="Name"
                placeholder="Name"
                className={classes["form-control"]}
                type="text"
                value={nameValue}
                onBlur={nameBlurHandler}
                onChange={nameChangeHandler}
              />
            </div>
            {nameHasError && <p>Enter the valid input</p>}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Description</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="clipboard"></ion-icon>
                </div>
              </div>
              <textarea
                name="Description"
                placeholder="Descripiton"
                className={classes["form-control"]}
                type="text"
                value={descriptionValue}
                onBlur={descriptionBlurHandler}
                onChange={descripionChangeHandler}
              />
            </div>
            {descriptionHasError && <p>Enter the valid input</p>}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Category</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="apps"></ion-icon>
                </div>
              </div>

              <select
                id="cars"
                value={categoryId}
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
            {catIdValueHasError && <p>Enter the valid input</p>}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Available</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="clipboard"></ion-icon>
                </div>
              </div>
              <input
                name="available"
                placeholder="Available"
                className={classes["form-control"]}
                type="text"
                value={available}
                onBlur={avaValueBlurHandler}
                onChange={avaValueChangeHandler}
              />
            </div>
            {avaValueHasError && <p>Enter the valid input</p>}
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Price</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="pricetag"></ion-icon>
                </div>
              </div>
              <input
                name="Price"
                placeholder="Price"
                className={classes["form-control"]}
                type="text"
                value={price}
                onBlur={priceBlurHandler}
                onChange={priceChangeHandler}
              />
            </div>
            {priceHasError && <p>Enter the valid input</p>}
          </div>
        </div>
        <div className={classes["form-group"]}>
          <label className={classes["input-label"]}>Image URL</label>
          <div className={classes["input-field"]}>
            <div className={classes["input-group"]}>
              <div className={classes["input-icon"]}>
                <div className={classes["input-icon-image"]}>
                  <ion-icon name="link"></ion-icon>
                </div>
              </div>
              <input
                name="Image URL"
                placeholder="Image URL"
                className={classes["form-control"]}
                type="text"
                value={imageUrlValue}
                onBlur={imageUrlValueBlurHandler}
                onChange={imageUrlValueChangeHandler}
              />
            </div>
            {imageUrlValueHasError && <p>Enter the valid input</p>}
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
            onClick={productId ? updateHandler : formSubmissionHandler}
          >
            {productId ? "UPDATE" : "SUBMIT"}{" "}
            <span className="glyphicon glyphicon-send"></span>
          </button>
        </div>
        {/* </fieldset> */}
      </form>
    </div>
  );
};

export default AddProduct;
