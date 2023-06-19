import React, { useEffect } from "react";
import "./AdminNavbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import axios from "axios";
export default function AdminNavbar() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.adminjwt) {
        navigate("/admin/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("adminjwt");
          navigate("/admin/login");
        } else {
        }
      }
    };
    verifyAdmin();
  });

  const logout = () => {
    removeCookie("adminjwt");
    // console.log(cookies.adminjwt);
    navigate("/admin/login");
  };
  return (
    <div className="navbar">
      <h2 className="title">Admin Dashboard</h2>
      <button className="logoutBtn" onClick={logout}>
        logout
      </button>
    </div>
  );
}
