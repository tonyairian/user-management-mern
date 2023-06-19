import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function AdminEditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, name,password } = location.state.data;
  const [values, setValues] = useState({ email: email, name: name });
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      console.log(values);
      const { data } = await axios.post(
        "http://localhost:4000/admin/updateuser",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          console.log("could't update user");
        } else {
          navigate("/admin/users");
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Edit User</h2>
        <form onSubmit={(e) => handleUpdate(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              defaultValue={name}
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
              defaultValue={email}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default AdminEditUser;
