import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "@firebase/app-compat";
import admin from "../../assets/admin.jpg";
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs";
import { FaCarCrash, FaCar } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import {
  MdOutlineCancelPresentation,
  MdOutlinePlace,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/action";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data);
  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggle2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutUser());
        toast.success("Logout Successfully...");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="side_menu">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ margin: "1rem 0 2rem" }}
        >
          <FaCar color="#cdcdcd" size={24} style={{ marginRight: "10px" }} />
          <h2>Parking System</h2>
        </div>
        <div className="admin_profile">
          <img src={admin} alt="admin" className="admin_pic" />
          <h3>{data?.userData?.name}</h3>
          <h5>{data?.userData?.email}</h5>
        </div>
        <h4>{data?.userData?.role === "admin" ? "Dashboard" : "User"}</h4>
        {data?.userData?.role === "admin" ? (
          <>
            <li onClick={() => navigate("/dashboard")}>
              <BsFillPersonFill
                color="#fff"
                size={20}
                style={{ marginRight: "15px" }}
              />
              <Link to="/dashboard">Users</Link>
            </li>
            <div className="dropValue">
              <FaCarCrash
                color="#fff"
                size={20}
                style={{ marginRight: "15px", position: "absolute", left: "0" }}
              />
              <button class="dropdown-btn" onClick={toggle}>
                Areas
                <BsFillCaretDownFill
                  color="#fff"
                  size={14}
                  style={{ marginLeft: "0.8rem" }}
                />
              </button>
              <div
                class="dropdown-container"
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/create">
                  <BiMessageSquareAdd
                    color="#fff"
                    size={20}
                    style={{ marginRight: "15px" }}
                  />
                  Create Area
                </Link>
                <Link to="/area-list">
                  <FaCarCrash
                    color="#fff"
                    size={20}
                    style={{ marginRight: "15px" }}
                  />
                  List Area
                </Link>
              </div>
            </div>
            <div className="dropValue">
              <MdOutlinePlace
                color="#fff"
                size={20}
                style={{ marginRight: "15px", position: "absolute", left: "0" }}
              />
              <button class="dropdown-btn" onClick={toggle2}>
                Slots
                <BsFillCaretDownFill
                  color="#fff"
                  size={14}
                  style={{ marginLeft: "0.8rem" }}
                />
              </button>
              <div
                class="dropdown-container"
                style={{ display: dropdownOpen2 ? "block" : "none" }}
              >
                <Link to="/create-slot">
                  <BiMessageSquareAdd
                    color="#fff"
                    size={20}
                    style={{ marginRight: "15px" }}
                  />
                  Create Slot
                </Link>
                <Link to="/slot-list">
                  <MdOutlineCreateNewFolder
                    color="#fff"
                    size={20}
                    style={{ marginRight: "15px" }}
                  />
                  List Slot
                </Link>
              </div>
            </div>

            <li onClick={() => navigate("/feedback")}>
              <VscFeedback
                color="#fff"
                size={20}
                style={{ marginRight: "15px" }}
              />
              <Link to="/feedback">Feedbacks</Link>
            </li>

            <li>
              <MdOutlineCancelPresentation
                color="#fff"
                size={20}
                style={{ marginRight: "15px" }}
              />
              <Link to="">Cancellations</Link>
            </li>
          </>
        ) : (
          <li><Link to="/home">Home</Link></li>
        )}

        <li onClick={logOut}>
          <AiOutlineLogout
            color="#fff"
            size={20}
            style={{ marginRight: "15px" }}
          />
          <Link to="">Logout</Link>
        </li>
      </div>
    </>
  );
};

export default SideMenu;
