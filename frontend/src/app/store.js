import { configureStore } from "@reduxjs/toolkit";
import navMenuReducer from "../features/navmenu/navMenuSlice";
import searchReducer from "../features/search/searchSlice";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    navmenu: navMenuReducer,
    search: searchReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
