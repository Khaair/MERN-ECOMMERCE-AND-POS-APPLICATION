
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenData: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.tokenData = action.payload.token;
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
