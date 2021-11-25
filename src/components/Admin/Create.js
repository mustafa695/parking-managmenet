import React from "react";
import SideMenu from "./SideMenu";
const Create = () => {
  const [tags, setTags] = React.useState(["example tag"]);
  return (
    <>
      <SideMenu />
      <div className="container" id="side_content">
        <div className="card" id="create_pk_form">
          <h2 className="mb-4" style={{ fontWeight: "500" }}>
            Create Areas
          </h2>
          <form>
            <label>Enter Area Name:</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Type Area Name Here..."
            />
            <div className="row">
              <div className="col-md-6">
                <label>Start Time</label>
                <input type="time" className="form-control mb-3" />
              </div>
              <div className="col-md-6">
                <label>End Time</label>
                <input type="time" className="form-control mb-3" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
