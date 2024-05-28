import { Navigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

export default function PrivateRoute({ children }: any) {
  const auth = useAuth();

  return auth ? children : <Navigate to="/login" />;
}
