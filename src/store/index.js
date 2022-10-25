import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import adminReducer from "./admin";
import companyReducer from "./company";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    company: companyReducer,
    auth: authReducer,
  },
});

export default store;
