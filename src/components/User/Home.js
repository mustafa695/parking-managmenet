import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../config/firebase";
import SideMenu from "../Admin/SideMenu";

const Home = () => {
  const [areaData, setAreaData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let temp = [];
    db.collection("areas")
      .get()
      .then((res) => {
        res.docs.map((i) => {
          temp.push({ data: i.data(), id: i.id });
        });
        setAreaData(temp);
      });
  }, []);

  return (
    <>
      <SideMenu />
      <div className="container">
        <div style={{ marginLeft: "15rem" }} id="home_page">
          <h1 className="text-center">Book Your Slots Now</h1>
          <hr />
          <div className="row" style={{ margin: "4rem 0 2rem" }}>
            {areaData?.map((data, ind) => {
              return (
                <div className="col-md-3" key={ind}>
                  <div
                    className="card"
                    onClick={() => navigate(`/slots-detail/${data?.id}`)}
                  >
                    <h2>{data?.data?.area}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
