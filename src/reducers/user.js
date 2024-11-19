import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    email: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = {
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
      };
    },
    removeUser: (state, action) => {
      state.value = {
        username: "",
        email: "",
        role: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
