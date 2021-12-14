import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "@firebase/app-compat";
import main from "../assets/main_park.png";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUserData } from "../store/action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state?.userData?.role == "user") {
      navigate("/home");
    } else if (state?.userData?.role == "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [state]);
  // console.log(users);
  const login = (e) => {
    e.preventDefault();
    setLoader(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoader(false);
        let user = userCredential.user;

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            dispatch(loginUserData({ ...doc.data(), id: doc.id }));
            // setTimeout(() => {
            if (doc.data()?.role === "admin") {
              toast.success("Welcome To Dashboard..");
              navigate("/dashboard");
            } else {
              toast.success("Login Successfully..");
              navigate("/home");
            }
            // }, 500);
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
      <h1 className="text-center">Login Now</h1>
      <div
        className="row align-items-center"
        style={{ padding: "0 !important" }}
      >
        <div className="col-md-5">
          <img src={main} alt="no-image" className="cover" />
        </div>
        <div className="col-md-7">
          <form onSubmit={login}>
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
                  <span
                    class="spinner-border spinner-border-sm"
                    style={{ marginRight: "0.33rem" }}
                  ></span>
                  Login...
                </button>
              ) : (
                <button className="login_btn">Login</button>
              )}
            </div>
          </form>
          <p className="text-center mt-3">
            Do you have an account? <Link to="/signup">Signup Now</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
