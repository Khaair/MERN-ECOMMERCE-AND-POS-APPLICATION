import { Navigate } from "react-router-dom";
import adminAuth from "../hooks/admin-auth";

export default function AdminRoute({ children }: any) {
  const auth = adminAuth();

  return auth ? children : <Navigate to="/login" />;
}
