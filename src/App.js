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

function App() {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("");
  const [loader, setLoader] = useState(false);
  const state = useSelector((state) => state);

  console.log(state, "-----------");
  // useEffect(() => {
  //   setLoader(true);
  //   auth.onAuthStateChanged((user) => {
  //     setUid(user?.uid);
  //   });

  //   if (uid?.length) {
  //     db.collection("users")
  //       .doc(uid)
  //       .get()
  //       .then((res) => {
  //         setRole(res.data()?.role);
  //         setLoader(false);
  //       })
  //       .catch((err) => {
  //         setLoader(false);
  //         console.log(err);
  //       });
  //   } else {
  //     setLoader(false);
  //   }
  // }, [uid]);

  // if (loader) {
  //   return (
  //     <div
  //       class="d-flex justify-content-center align-items-center"
  //       style={{ height: "80vh" }}
  //     >
  //       <div class="spinner-border" role="status">
  //         <span class="sr-only"></span>
  //       </div>
  //     </div>
  //   );
  // }

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
            <Route exact path="/home" element={<Home />} />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
