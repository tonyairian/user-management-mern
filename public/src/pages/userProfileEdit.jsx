import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const UserProfileEdit = () => {
  const location = useLocation();
  const { email, name, password } = location.state.data;
  const [values, setValues] = useState({
    email: email,
    name: name,
    password: password,
  });
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img);
    formData.append("name", values.name);
    formData.append("email", values.email);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/updateuser",

        formData,

        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // },
        { withCredentials: true }
      );

      if (data) {
        if (data.errors) {
          console.log("could't update");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fileUpl = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Edit User</h2>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
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
          <label htmlFor="img">Select image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={fileUpl}
            accept="image/*"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UserProfileEdit;
