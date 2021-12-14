import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import SideMenu from "../Admin/SideMenu";

const Booking = () => {
  const [bookData, setBookData] = useState([]);
  const uid = useSelector((state) => state?.userData?.id);

  useEffect(() => {
    let temp = [];
    db.collection("booking")
      .where("bookerId", "==", uid)
      .get()
      .then((res) => {
        res.docs.map((i) => {
          temp.push({ data: i.data(), docId: i.id });
        });
        setBookData(temp);
      });
  }, [uid]);

  const cancelled = (id) => {
    db.collection("booking")
      .doc(id)
      .update({
        isCancel: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <SideMenu />
      <div className="container">
        <div style={{ marginLeft: "15rem" }} id="home_page">
          <h1 className="mt-4 text-center">Your Booking</h1>
          <hr />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Area Name</th>
                  <th>Booking Date</th>
                  <th>From - To</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookData.length
                  ? bookData?.map((item) => {
                      return (
                        <tr>
                          <td>{item?.data?.areaName}</td>
                          <td>{item?.data?.parkingDate}</td>
                          <td>
                            {item?.data?.startTime} - {item?.data?.endTime}
                          </td>
                          <td>{item?.data?.cost}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => cancelled(item?.docId)}
                              disabled={
                                item.data.isCancel == true ? true : false
                              }
                            >
                              {item?.data?.isCancel == true
                                ? "Cancelled"
                                : "Cancel"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : "Sorry No Booking Found.."}
                  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
