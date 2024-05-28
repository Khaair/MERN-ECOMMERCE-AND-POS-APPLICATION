
import { loginSuccess, logoutSuccess } from "../slices/authSlice";

const fakeLoginAPI = async (credentials: any) => {

  return new Promise((resolve) => {
    resolve({ token: credentials });
  });
};

export const login = (credentials: any) => async (dispatch:any) => {
  try {
    const response = await fakeLoginAPI(credentials);
    const { token } :any= response;
    console.log("token", token);

    dispatch(loginSuccess({ token }));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logout = () => (dispatch:any) => {
  dispatch(logoutSuccess());
};
