import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import SideMenu from "./SideMenu";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";

const AreaList = (props) => {
  const [areaContent, setAreaContent] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [editArea, setEditArea] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [edtId, setEdtId] = useState("");

  const fetch = () => {
    db.collection("areas")
      .get()
      .then((area) => {
        let temp = [];
        area.docs.map((res) => {
          temp.push({ data: res.data(), id: res.id });
          setLoader(false);
        });
        setAreaContent(temp);
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

  const toggle = (id, area, starTime, endTime) => {
    setModal(!modal);
    setEditArea(area);
    setEditStartTime(starTime);
    setEdtId(id);
    setEditEndTime(endTime);
  };
  const updateArea = (id) => {
    db.collection("areas")
      .doc(id)
      .update({
        area: editArea,
        endTime: editEndTime,
        startTime: editStartTime,
      })
      .then((res) => {
        setModal(!modal);
        console.log(res);
        fetch();
        toast.success("Area has been updated..");
      })
      .catch((err) => console.log(err));
  };

  const deleted = (id) => {
    db.collection("areas")
      .doc(id)
      .delete()
      .then(() => {
        fetch();
        toast.success("Area Deleted...");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <ToastContainer />
        <div className="card">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            Area List
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
                  <th>Area Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
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
                  areaContent?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.data?.area}</td>
                        <td>{item?.data?.startTime}</td>
                        <td>{item?.data?.endTime}</td>

                        <td>
                          <button
                            className="td_edit"
                            onClick={() =>
                              toggle(
                                item?.id,
                                item?.data?.area,
                                item?.data?.startTime,
                                item?.data?.endTime
                              )
                            }
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="td_remove"
                            onClick={() => deleted(item?.id)}
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
        <ModalHeader toggle={toggle}>Edit Area</ModalHeader>
        <ModalBody>
          <label>Area Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={editArea}
            onChange={(e) => setEditArea(e.target.value)}
          />
          <label>Start Time</label>
          <input
            type="time"
            className="form-control mb-3"
            value={editStartTime}
            onChange={(e) => setEditStartTime(e.target.value)}
          />
          <label>End Time</label>
          <input
            type="time"
            className="form-control mb-3"
            value={editEndTime}
            onChange={(e) => setEditEndTime(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => updateArea(edtId)}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AreaList;
