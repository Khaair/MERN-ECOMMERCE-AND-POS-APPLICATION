
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  tokenData: null,
  info:{},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action.payload.token", action.payload.token)
      state.tokenData = action.payload.token;
      state.info =  jwtDecode(action.payload.token.token),
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.tokenData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
