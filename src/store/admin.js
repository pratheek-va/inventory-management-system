import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  companies: [],
  categoryId: "",
  orders: [],
  company: {},
  order: {},
  product: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCompany(state, action) {
      state.company = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    retrieveCompanies(state, action) {
      state.companies = action.payload;
    },
    retrieveOrders(state, action) {
      state.orders = action.payload;
    },
    retrieveProduct(state, action) {
      state.items = action.payload;
    },
    addCompany(state, action) {
      state.companies = state.companies.concat(action.payload);
    },
    addProduct(state, action) {
      state.items = state.items.concat(action.payload[0]);
    },
    decreaseQuantity(state, action) {
      const index = state.items.indexOf(
        state.items.find(
          (product) => product.productId === action.payload.productId
        )
      );
      state.items[index].availability -= action.payload.quantity;
    },
    updateProduct(state, action) {
      const items = state.items;
      for (let i = 0; i < state.items.length; i++) {
        if (items[i].productId === action.payload.productId)
          items[i].availability = action.payload.availability;
        state.items = items;
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.productId !== action.payload
      );
      console.log(state.items);
    },
    approveOrder(state) {},
    changeCategory(state, action) {
      state.categoryId = action.payload;
      console.log(state.categoryId);
    },
    addOrder(state, action) {
      state.orders = state.orders.concat(action.payload);
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
