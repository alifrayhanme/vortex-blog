import { configureStore } from "@reduxjs/toolkit";
import navMenuReducer from "../features/navmenu/navMenuSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    navmenu: navMenuReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
