import React from "react";
import SideMenu from "../SideMenu";
import Select from "react-select";

const AddSlot = () => {
  const options = [
    { value: "korangi", label: "Korangi" },
    { value: "lyari", label: "Lyari" },
    { value: "saddar", label: "Saddar" },
  ];
  const handleAreas = (e) => {
    console.log(e);
  }
  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <div className="card">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            Create Slot
          </h2>
          <form action="" style={{ width: "80%", paddingBottom:'2rem' }}>
            <label>Slot Name:</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Type Slot Name Here..."
            />
            <label>Select Areas:</label>
            <Select options={options} isMulti onChange={(e) => handleAreas(e)}/>
            <button className="btn btn-dark" style={{marginTop:'2rem'}}>Create Slot</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSlot;
