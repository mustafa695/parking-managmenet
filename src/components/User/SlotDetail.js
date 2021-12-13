import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SideMenu from "../Admin/SideMenu";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

const schema = yup
  .object({
    startTime: yup.string().required(),
    endTime: yup.string().required(),
    date: yup.string().required(),
  })
  .required();
const SlotDetail = () => {
  const loc = useLocation();
  const id = loc.pathname.slice(14);
  const [areaDetail, setAreaDetail] = useState([]);
  const [showSlots, setShowSlots] = useState(false);
  const [userStartTime, setUserStartTime] = useState("");
  const [userDate, setUserDate] = useState("");
  const [userEndTime, setUserEndTime] = useState("");
  const [cantBook, setCantBook] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [slots, setSlots] = useState([]);
  const [bookData, setBookData] = useState([]);
  const user = useSelector((state) => state);
  let getDated = new Date();
  let currentDated = getDated.toISOString().slice(0, 10);
  
  useEffect(() => {
    let temp = [];
    db.collection("slots")
      .where("areaId", "==", id)
      .get()
      .then((res) => {
        res.docs.map((i) => {
          temp.push({ data: i.data(), id: i.id });
        });
        setSlots(temp);
      });

    db.collection("areas")
      .doc(id)
      .get()
      .then((res) => {
        setAreaDetail(res.data());
      });
    //booking get
    let temp2 = [];
    db.collection("booking")
      .where("areaId", "==", id)
      .where("bookingDate", ">=", currentDated)
      .get()
      .then((res) => {
        res.docs.map((i) => {
          temp2.push(i.data());
        });
        setBookData(temp2);
      })
      .catch((err) => console.log(err));
  }, [id, currentDated]);
  // console.log(slots);
  const checkAvailablity = (data, e) => {
    setShowSlots(true);
    setUserStartTime(data.startTime);
    setUserEndTime(data.endTime);
    setUserDate(data.date);
    let getdate = new Date();
    let currentDate = getdate.toISOString().slice(0, 10);

    for (let i = 0; i < bookData?.length; i++) {
      let filteredSlots = slots?.filter((s) => bookData[i].slotId === s.id);
      if (filteredSlots.length) {
        for (let f = 0; f < filteredSlots.length; f++) {
          if (
            data.startTime <= bookData[i].endTime &&
            data.endTime >= bookData[i].startTime &&
            bookData[i].parkingDate === data.date
          ) {
            let ind = slots.findIndex((ind) => bookData[i]?.slotId === ind.id);
            // console.log(slots[ind], "--index number");
            let dup = [...slots];
            dup[ind].available = false;
            setSlots(dup);
          } else {
            let ind = slots.findIndex((ind) => bookData[i]?.slotId === ind.id);
            // console.log(slots[ind], "--index number");
            let dup = [...slots];
            dup[ind].available = true;
            setSlots(dup);
          }
        }
      }
    }
  };
  //   const getBookSlots = () => {

  //   };

  const bookSlot = (sid, areaName, slotName) => {
    if (!userStartTime.length && !userEndTime.length) {
      toast.error("Please confirm check availabity first.");
    } else {
      let getdate = new Date();
      let currentDate = getdate.toISOString().slice(0, 10);
      let input = {
        startTime: userStartTime,
        endTime: userEndTime,
        slotId: sid,
        areaId: id,
        bookerName: user?.userData?.name,
        bookerId: user?.userData?.id,
        status: true,
        bookingDate: currentDate,
        parkingDate: userDate,
      };

      db.collection("booking")
        .add(input)
        .then((res) => {
          savePdf(
            currentDate,
            input.bookerName,
            areaName,
            slotName,
            input.startTime,
            input.endTime
          );
          setCantBook(true);
          let ind = slots?.findIndex((ind) => sid === ind.id);
          // console.log(slots[ind], "--index number");
          let dup = [...slots];
          dup[ind].available = false;
          setSlots(dup);
          toast.success("Your Slots Booked Successfully...!");
        })
        .catch((err) => console.log(err));
    }
  };
  const savePdf = (
    currentDate,
    bookerName,
    areaName,
    slotName,
    startTime,
    endTime
  ) => {
    let doc = new jsPDF("p", "pt");

    doc.text(
      40,
      40,
      ` ******Parking Slip****** \n Date of Slip: ${currentDate} \n Booker Name: ${bookerName} \n Parking Area Name: ${areaName} \n Parking Slot Name: ${slotName} \n Parking Time: From ${startTime} To ${endTime} \n *********************************`
    );
    doc.save("test1.pdf");
  };
  return (
    <>
      <SideMenu />
      <div style={{ marginLeft: "20rem" }}>
        <div className="container" id="slots_detail">
          <h2 className="my-4">Slots</h2>
          <p>Check Slots Availablity</p>
          <form onSubmit={handleSubmit(checkAvailablity)}>
            <div className="row align-items-start">
              <div className="col-md-3">
                <label>Start Time</label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="form-control"
                />
                <span className="text text-danger">
                  {errors.startTime?.message}
                </span>
              </div>
              <div className="col-md-3">
                <label>End Time</label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="form-control"
                />
                <span className="text text-danger">
                  {errors.endTime?.message}
                </span>
              </div>
              <div className="col-md-3">
                <label>Date</label>
                <input
                  min={currentDated}
                  type="date"
                  {...register("date")}
                  className="form-control"
                />
                <span className="text text-danger">{errors.date?.message}</span>
              </div>
              <div className="col-md-3 mt-4">
                <button className="btn btn-primary" type="submit">
                  Check Availablity
                </button>
              </div>
            </div>
          </form>

          <div className="row" style={{ display: showSlots ? "flex" : "none" }}>
            {slots?.length ?
              slots?.map((data) => {
                return (
                  <div className="col-md-2">
                    <div
                      className="card"
                      onClick={() =>
                        data?.available === false
                          ? alert("Sorry Already Booked")
                          : cantBook
                          ? toast.error("You can book one slot at a time")
                          : bookSlot(data?.id, data?.area, data?.slotName)
                      }
                      style={{
                        cursor:
                          data?.available === false || cantBook
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          data?.available == false ? "red" : "#fff",
                        color: data?.available === false ? "#fff" : "#000",
                      }}
                    >
                      <h4 className="text-center">{data?.data?.slotName}</h4>
                    </div>
                  </div>
                );
              }): '' }
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotDetail;
