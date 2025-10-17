import { configureStore } from "@reduxjs/toolkit";
import navMenuReducer from "../features/navmenu/navMenuSlice";

const store = configureStore({
  reducer: {
    navmenu: navMenuReducer,
  },
});

export default store;
