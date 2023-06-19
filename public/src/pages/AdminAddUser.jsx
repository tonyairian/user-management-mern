import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function AdminAddUser() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const userAdded = () => {
    toast.success("User Added Successfully!", {
      position: "bottom-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/adduser",
        { ...values },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          userAdded();
          setValues({ name: "", email: "", password: "" });
          navigate("/admin/users");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div></div>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Add New User</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Submit</button>
          <button>
            <Link
              to="/admin/dashboard"
              style={{ textDecoration: "none", color: "white" }}
            >
              Cancel
            </Link>
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
