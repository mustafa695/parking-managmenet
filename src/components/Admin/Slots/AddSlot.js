import React, { useEffect, useState } from "react";
import SideMenu from "../SideMenu";
import Select from "react-select";
import { db } from "../../../config/firebase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    slotName: yup.string().required(),
    // selectedAreas: yup.string().required(),
  })
  .required();

const AddSlot = () => {
 
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  
  });

  useEffect(() => {
    let temp = [];
    db.collection("areas")
      .get()
      .then((res) => {
        res.docs.map((a) => {
          let obj = {
            id: a.id,
            label: a.data().area,
            value: a.data().area,
          };
          temp.push(obj);
        });

        setOptions(temp);
      });
  }, []);

  const handleAreas = (e) => {
    setSelectedAreas(e);
    if (!e.length > 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const createSlot = (data, e) => {
    
    let count = 0;
    for (let i = 0; i < selectedAreas.length; i++) {
      let docID = selectedAreas[i].id;
      let input = {
        slotName: data.slotName,
        area: selectedAreas[i].value,
        areaId: selectedAreas[i].id,
        available: true,
      };
      db.collection("slots")
        .add(input)
        .then((res) => {
          e.target.reset();
          count += 1;
          
          // setOptions(selectedAreas);
          if (selectedAreas.length === count) {
            e.target.reset();
            setSelectedAreas("");
            toast.success("Slot Created Sucessfully...");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <div className="card">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            Create Slot
          </h2>
          <form
            onSubmit={handleSubmit(createSlot)}
            style={{ width: "80%", paddingBottom: "2rem" }}
          >
            <label>Slot Name:</label>
            <input
              type="text"
              {...register("slotName")}
              className="form-control "
              placeholder="Type Slot Name Here..."
            />
            <span className="text text-danger">{errors.slotName?.message}</span>
            <br />
            <label>Select Areas:</label>
            <Select
              options={options}
              isMulti
              onChange={(e) => handleAreas(e)}
              className="mt-3"
              value={selectedAreas || ''}
            />
            {error && (
              <>
                <span className="text text-danger p-1">
                  Please select atleast one area
                </span>
                <br />
              </>
            )}
            <button
              className="btn btn-dark"
              style={{ marginTop: "2rem" }}
              disabled={error ? true : false}
              type="submit"
            >
              Create Slot
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSlot;
