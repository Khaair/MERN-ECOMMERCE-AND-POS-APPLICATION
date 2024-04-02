import { Navigate } from "react-router-dom";
import userAuth from "../hooks/user-auth";

export default function UserRoute({ children }: any) {
  const auth = userAuth();

  return auth ? children : <Navigate to="/login" />;
}
