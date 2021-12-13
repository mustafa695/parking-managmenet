import React, { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./App.scss";
import AreaList from "./components/Admin/AreaList";
import Create from "./components/Admin/Create";
import Feedback from "./components/Admin/Feedback";
import AddSlot from "./components/Admin/Slots/AddSlot";
import SlotList from "./components/Admin/Slots/SlotList";
import User from "./components/Admin/User";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import Home from "./components/User/Home";
import SlotDetail from "./components/User/SlotDetail";

function App() {
  
  const state = useSelector((state) => state);



  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {state.userData?.role === "admin" && (
            <>
              <Route exact path="/dashboard" element={<User />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/feedback" element={<Feedback />} />
              <Route exact path="/area-list" element={<AreaList />} />
              <Route exact path="/slot-list" element={<SlotList />} />
              <Route exact path="/create-slot" element={<AddSlot />} />
            </>
          )}
          {state.userData?.role === "user" && (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/slots-detail/:id" element={<SlotDetail />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
