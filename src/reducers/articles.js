import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const articlesSlice = createSlice({
  name: "articles",

  initialState,
  reducers: {
    getWithBdd: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getWithBdd } = articlesSlice.actions;
export default articlesSlice.reducer;
