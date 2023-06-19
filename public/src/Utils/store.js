import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
// import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    // lists: adminSlice,
    user: userSlice,
  },
});
export default store;
