import Login from "../components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../components/signup";
import PrivateRoute from "../auth/private-route";
import UserManagement from "../components/user-management";
import Admin from "../pages/admin";
import Users from "../pages/users";
import Dashboard from "../components/dashboard";
import AdminRoute from "../auth/admin-route";
import UserRoute from "../auth/user-route";
import ForgotPassword from "../components/forgot-password";
import POSAPP from "../components/pos";
import Category from "../pages/admin/category";

const data = [
  {
    id: "1",
    title: "HP Laptop G500",
    price: 5000,
    category: "HP",
    imgSrc: "https://i.ibb.co/QXSLWTN/pexels-karsten-madsen-18105.jpg",
  },
  {
    id: "2",
    title: "HP Laptop G501",
    price: 6000,
    category: "HP",
    imgSrc: "https://i.ibb.co/hLwY1Xt/product-1.jpg",
  },
  {
    id: "3",
    title: "HP Laptop G502",
    price: 4000,
    category: "HP",
    imgSrc: "https://i.ibb.co/N1c38MJ/laptop-1205256-640.jpg",
  },
  {
    id: "4",
    title: "HP Laptop G503",
    price: 3000,
    category: "HP",
    imgSrc: "https://i.ibb.co/zH5kCqs/images.png",
  },
  {
    id: "5",
    title: "HP Laptop G504",
    price: 7000,
    category: "HP",
    imgSrc: "https://i.ibb.co/ydDhcbF/imagces-1.jpg",
  },
  {
    id: "6",
    title: "ASUS Laptop G505",
    price: 3000,
    category: "ASUS",
    imgSrc: "https://i.ibb.co/zH5kCqs/images.png",
  },
  {
    id: "7",
    title: "ASUS Laptop G506",
    price: 3000,
    category: "ASUS",
    imgSrc: "https://i.ibb.co/ydDhcbF/imagces-1.jpg",
  },
  {
    id: "8",
    title: "ASUS Laptop G507",
    price: 5000,
    category: "ASUS",
    imgSrc: "https://i.ibb.co/QXSLWTN/pexels-karsten-madsen-18105.jpg",
  },
  {
    id: "9",
    title: "ASUS Laptop G508",
    price: 6000,
    category: "ASUS",
    imgSrc: "https://i.ibb.co/hLwY1Xt/product-1.jpg",
  },
  {
    id: "10",
    title: "ASUS Laptop G509",
    price: 4000,
    category: "ASUS",
    imgSrc: "https://i.ibb.co/N1c38MJ/laptop-1205256-640.jpg",
  },
];

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes> 

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/category"
          element={
            <AdminRoute>
              <Category />
            </AdminRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/pos-app"
          element={
            <AdminRoute>
              <POSAPP data={data} />
            </AdminRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/users"
          element={
            <UserRoute>
              <Users />
            </UserRoute>
          }
        />
      </Routes>

      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>

      <Routes>
        <Route
          path="/add-user"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
