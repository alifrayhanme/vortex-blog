import { configureStore } from "@reduxjs/toolkit";
import navMenuReducer from "../features/navmenu/navMenuSlice";
import searchReducer from "../features/search/searchSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    navmenu: navMenuReducer,
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
