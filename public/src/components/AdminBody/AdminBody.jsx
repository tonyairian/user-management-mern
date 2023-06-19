import React from "react";
import "./AdminBody.css";
import { Link } from "react-router-dom";
export default function AdminBody() {
  return (
    <>
      <div className="isList">
        <div className="saaaju">
          
          <div>
            <Link to="/admin/adduser">
              {" "}
              <button className="addBtn">add user</button>{" "}
            </Link>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <button style={{}}>Users</button>
            </Link>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}
