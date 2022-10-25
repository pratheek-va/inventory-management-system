import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  isUser: false,
  loggedInUser: {},
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload.data;
      if (action.payload.role === "admin") state.isAdmin = true;
      else state.isUser = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      if (action.payload === "admin") state.isAdmin = false;
      else state.isUser = false;
    },
    updateCompany(state, action) {
      state.loggedInUser.totalProductsBought =
        action.payload.totalProductsBought;
      state.loggedInUser.totalMoneySpent = action.payload.totalMoneySpent;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
