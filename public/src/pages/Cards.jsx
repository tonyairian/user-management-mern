import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Utils/userSlice";
const image_path = "http://localhost:4000/images/";

export default function Cards() {
  const User = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [UserDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );

        setUserDetails(data);
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          dispatch(userLogin(data));
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const editUser = async (userId) => {
    try {
      const userdetails = await axios.post(
        "http://localhost:4000/editprofile",
        {
          userId,
        },
        { withCredentials: true }
      );

      if (userdetails) {
        const data = userdetails.data.userDetails;
        navigate("/profile", { state: { data } });
      } else {
        console.log("no user found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="private">
        {/* <h1>Super Secret Page</h1> */}
        <p>{`Hi ${User.name}`}</p>

        <div class="card">
          <img
            src={image_path + UserDetails.image}
            alt="avatar"
            style={{ width: "250px", height: "200px" }}
          />

          {/* <p>{UserDetails.image}</p> */}
        </div>

        <button
          className="editUserProfile"
          onClick={(e) => editUser(UserDetails.id)}
        >
          Edit ...
        </button>

        <button className="logOutBtn" onClick={logOut}>
          Log out
        </button>
      </div>
      <ToastContainer />
    </>
  );
}
