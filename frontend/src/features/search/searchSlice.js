import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    query: "",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.results = [];
      state.query = "";
    },
  },
});

export const { setSearchResults, setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;