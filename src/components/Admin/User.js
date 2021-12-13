import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import SideMenu from "./SideMenu";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";

const User = (props) => {
  const [userContent, setUserContent] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [edtId, setEdtId] = useState("");
  const [edtRole, setEdtRole] = useState("");

  const fetch = () => {
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
  };
  useEffect(() => {
    setLoader(true);
    fetch();
  }, []);

  const toggle = (id, name, email, role) => {
    setModal(!modal);
    setEditName(name);
    setEditEmail(email);
    setEdtId(id);
    setEdtRole(role);
  };
  const updateUser = (id) => {
    db.collection("users")
      .doc(id)
      .update({
        name: editName,
        role: edtRole,
      })
      .then((res) => {
        setModal(!modal);
        console.log(res);
        fetch();
        toast.success("User has been updated..");
      })
      .catch((err) => console.log(err));
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];
  const deleteUser = (id) => {
    db.collection("users")
      .doc(id)
      .delete()
      .then((res) => {
        fetch();
        console.log("deleted")
      })
      .catch((err) => console.log(err));
  };
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

              <tbody>
                {loader ? (
                  <tr className="text-center">
                    <td colspan="4">
                      <div class="spinner-border text-primary"></div>
                    </td>
                  </tr>
                ) : (
                  userContent?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.data?.name}</td>
                        <td>{item?.data?.email}</td>
                        <td className="text-uppercase">{item?.data?.role}</td>
                        <td>
                          <button
                            className="td_edit"
                            onClick={() =>
                              toggle(
                                item?.id,
                                item?.data?.name,
                                item?.data?.email,
                                item?.data?.role
                              )
                            }
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="td_remove"
                            onClick={() => deleteUser(item?.id)}
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        size="md"
        isOpen={modal}
        toggle={toggle}
        className={props.className}
      >
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <label>Full Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            className="form-control mb-3"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            disabled
          />
          <label>Role</label>
          <Select
            onChange={(e) => setEdtRole(e.value)}
            options={options}
            defaultValue={edtRole === "admin" ? options[0] : options[1]}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => updateUser(edtId)}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default User;
