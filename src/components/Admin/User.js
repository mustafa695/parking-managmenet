import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import SideMenu from "./SideMenu";
import { FiEdit, FiTrash } from "react-icons/fi";

const User = () => {
  const [userContent, setUserContent] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    db.collection("users")
      .get()
      .then((user) => {
        let temp = [];
        user.docs.map((res) => {
          temp.push({ data: res.data(), id: res.id });
          setLoader(false);
        });
        setUserContent(temp);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  console.log(userContent, "----userContent");
  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <ToastContainer />
        <div className="card">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            User
          </h2>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead
                style={{
                  backgroundColor: "#000",
                  border: "1px solid #000",
                  color: "#fff",
                }}
              >
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loader ? (
                <tbody>
                  <tr>
                    <div class="spinner-border text-primary"></div>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {userContent?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.data?.name}</td>
                        <td>{item?.data?.email}</td>
                        <td className="text-uppercase">{item?.data?.role}</td>
                        <td>
                          <button
                            className="td_edit"
                            onClick={() => alert(item?.id)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="td_remove"
                            onClick={() => alert(item?.id)}
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
