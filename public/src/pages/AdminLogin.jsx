import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
export default function AdminLogin() {
  // const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const [cookies, setCookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.adminjwt) {
        navigate("/admin");
        
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie("adminjwt");
          navigate("admin/login");
        }
      }
    };
    verifyUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
