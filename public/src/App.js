import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import AdminAddUser from "./pages/AdminAddUser";
import UserList from "./pages/UserList";
import AdminEditUser from "./pages/AdminEditUser";
import UserProfileEdit from "./pages/userProfileEdit";
import { Provider } from "react-redux";
import store from "./Utils/store";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Provider store={store}><Cards/></Provider>} />
        <Route exact path="/profile" element={<UserProfileEdit />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/admin/adduser" element={<AdminAddUser />} />
        <Route exact path="/admin/users" element={<UserList />} />
        <Route exact path="/admin/edituser" element={<AdminEditUser />} />
      </Routes>
    </BrowserRouter>
  );
}
