import axios from "axios";
import AdminNavbar from '../components/AdminNavbar/AdminNavbar'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [values, setValues] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:4000/admin/users", {}).then((response) => {
      setValues(response.data.users);
    });
  }, [search, values]);

  const deleteUser = async (userId) => {
    try {
      await axios.post(
        "http://localhost:4000/admin/delete",
        {
          userId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (userId) => {
    try {
      const userdetails = await axios.post(
        "http://localhost:4000/admin/edituser",
        {
          userId,
        },
        { withCredentials: true }
      );
      if (userdetails) {
        const data = userdetails.data.userDetails;
           console.log(data);
        navigate("/admin/edituser", { state: { data } });
      } else {
        console.log("no user found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function filterData(search, values) {
    const filterData = values.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    return filterData;
  }

  return (
    <>
    <AdminNavbar/>
      <div className="sajuDiv">
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button
          className="searchBtn"
          onClick={() => {
            const data = filterData(search, values);
            setValues(data);
          }}
        >
          Search
        </button>
        <br />
      </div>
      <div className="userList">
        {values.map((user) => {
          return (
            <div className="card" key={user._id}>
              <div className="container">
                <h4>
                  <b>{user.name}</b>
                </h4>
                <p className="Emaill">{user.email}</p>
                <button className="editBtn" onClick={(e) => editUser(user._id)}>
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={(e) => deleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
