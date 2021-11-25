import React from "react";
import error from '../assets/error.jpg'
const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection:'column',
        justifyContent: "center",
        width: "100%",
        height: "80vh",
        alignItems: "center",
      }}
    >
      <img src={error} alt="error" style={{width:'45vh'}}/>
      <h1 className="text-center" style={{marginTop:'-30px', fontWeight:'500', fontSize:'50px'}}> 404 Not Found</h1>
    </div>
  );
};

export default NotFound;
