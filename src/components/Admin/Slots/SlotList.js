import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import SideMenu from "../SideMenu";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SlotList = (props) => {
  const [slotContent, setSlotContent] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [edtSlotName, setEditSlotName] = useState("");
  const [editArea, setEditArea] = useState("");
  const [edtId, setEdtId] = useState("");

  const fetch = () => {
    db.collection("slots")
      .get()
      .then((slot) => {
        let temp = [];
        slot.docs.map((res) => {
          temp.push({ data: res.data(), id: res.id });
          setLoader(false);
        });
        setSlotContent(temp);
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

  const toggle = (id, slot, areas) => {
    setModal(!modal);
    setEditSlotName(slot);
    setEditArea(areas);
    setEdtId(id);
  };
  const updateSlots = (id) => {
    db.collection("slots")
      .doc(id)
      .update({
        area: editArea,
        slotName: edtSlotName,
      })
      .then((res) => {
        setModal(!modal);
        console.log(res);
        fetch();
        toast.success("Slot has been updated..");
      })
      .catch((err) => console.log(err));
  };
  const deleted = (id) => {
    db.collection("slots")
      .doc(id)
      .delete()
      .then(() => {
        fetch();
        toast.success("Slot Deleted...")
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
            Slot List
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
                  <th>Slot Name</th>
                  <th>Slot Area Name</th>
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
                  slotContent?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.data?.slotName}</td>
                        <td>{item?.data?.area}</td>
                        <td>
                          <button
                            className="td_edit"
                            onClick={() =>
                              toggle(
                                item?.id,
                                item?.data?.slotName,
                                item?.data?.area
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
          <label>Slot Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={edtSlotName}
            onChange={(e) => setEditSlotName(e.target.value)}
          />
          <label>Area Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={editArea}
            onChange={(e) => setEditArea(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => updateSlots(edtId)}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SlotList;
