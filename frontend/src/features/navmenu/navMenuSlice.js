import { createSlice } from "@reduxjs/toolkit";

const navMenuSlice = createSlice({
  name: "navmenu",
  initialState: {
    isMenuOpen: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export default navMenuSlice.reducer;

export const { toggleMenu } = navMenuSlice.actions;
