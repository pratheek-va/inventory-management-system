import { createSlice } from "@reduxjs/toolkit";

const initialState = { orders: [], products: [] };

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    retrieveOrders(state, action) {
      state.orders = action.payload;
    },
    retrieveProduct(state, action) {
      state.products = action.payload;
    },
    placeOrder(state, action) {
      state.orders = state.orders.concat(action.payload);
    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;
