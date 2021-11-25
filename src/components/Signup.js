import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import main from "../assets/main_park.png";
import firebase from "@firebase/app-compat";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const signup = (e) => {
    e.preventDefault();
    setLoader(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        let docId = user?.uid;
        let data = {
          name,
          email,
          role: "user",
        };
        db.collection("users")
          .doc(docId)
          .set(data)
          .then((snapshot) => {
            setLoader(false);
            toast.success("Signup Successfully...");
            setName("");
            setPassword("");
            setEmail("");
          })
          .catch((err) => {
            setLoader(false);
            console.log(err, "something went wrong");
          });
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container" id="login">
      <ToastContainer />
      <h1 className="text-center">Signup Now</h1>
      <div
        className="row align-items-center"
        style={{ padding: "0 !important" }}
      >
        <div className="col-sm-5">
          <img src={main} alt="no-image" className="cover" />
        </div>
        <div className="col-sm-7">
          <form onSubmit={signup}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Name</label>
              <input
                type="text"
                className="email"
                placeholder="Type Your Name..."
                // required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Email</label>
              <input
                type="email"
                className="email"
                placeholder="Type Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "40px",
              }}
            >
              <label>Password</label>
              <input
                type="password"
                className="password"
                placeholder="Type Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              {loader ? (
                <button class="login_btn" disabled>
                  <span class="spinner-border spinner-border-sm" style={{marginRight:'0.33rem'}}></span>
                  Singup...
                </button>
              ) : (
                <button className="login_btn">Signup</button>
              )}
            </div>
          </form>
          <p className="text-center mt-3">
            I have already account! <Link to="/">Login Now</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
