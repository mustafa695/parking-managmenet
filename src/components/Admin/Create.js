import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    area: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required()
  })
  .required();

const Create = () => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createArea = (data, e) => {
    console.log(data);
    
    setLoader(true);
    let input = { area: data.area, startTime: data.startTime, endTime: data.endTime}
    db.collection("areas")
      .add(input)
      .then((snapshot) => {
        e.target.reset();
        setLoader(false);
        toast.success("Area Created Successfully..");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <div className="card" id="create_pk_form">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            Create Areas
          </h2>
          <form onSubmit={handleSubmit(createArea)}>
            <label>Enter Area Name:</label>
            <input
              type="text"
              {...register("area")}
              className="form-control mt-3"
              placeholder="Type Area Name Here..."
              // value={area}
              // onChange={(e) => setArea(e.target.value)}
            />
             <span className="text text-danger">{errors.area?.message}</span>
            <div className="row">
              <div className="col-md-6 mt-3">
                <label>Start Time</label>
                <input
                  type="time"
                  {...register("startTime")}
                  className="form-control "
                  // value={startTime}
                  // onChange={(e) => setStartTime(e.target.value)}
                />
                 <span className="text text-danger">{errors.startTime?.message}</span>
              </div>
              <div className="col-md-6 mt-3">
                <label>End Time</label>
                <input
                  type="time"
                  {...register("endTime")}
                  className="form-control "
                  // value={endTime}
                  // onChange={(e) => setEndTime(e.target.value)}
                />
                 <span className="text text-danger">{errors.endTime?.message}</span>
              </div>
            </div>
            {loader ? (
              <button class="btn btn-primary" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  style={{ marginRight: "0.5rem" }}
                ></span>
                Creating..
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
