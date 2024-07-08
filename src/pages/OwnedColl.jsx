import React, { useState } from "react";
import "./ownedColl.css";
import CardHolder from "../component/CardHolder";
import VideoUpload from "../component/VideoUpload";

const OwnedColl = () => {
  const [selectedDiv, setSelectedDiv] = useState(1);

  const myArray = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const handleDivClick = (divNumber) => {
    setSelectedDiv(divNumber);
  };

  return (
    <div className="ownedColl_container">
      <div className="ownedColl_container_upper">
        <h2>Collections</h2>
        {/* <hr className="hr"></hr> */}
        <VideoUpload />
      </div>
      {/* <div className="ownedColl_container_middle">
        <div
          className={`${selectedDiv === 1 ? "tab_active" : ""}  ownedColl_tab`}
          onClick={() => handleDivClick(1)}
        >
          All
        </div>
        <div
          className={`${selectedDiv === 2 ? "tab_active" : ""}  ownedColl_tab`}
          onClick={() => handleDivClick(2)}
        >
          Sport
        </div>
        <div
          className={`${selectedDiv === 3 ? "tab_active" : ""}  ownedColl_tab`}
          onClick={() => handleDivClick(3)}
        >
          Photography
        </div>
        <div
          className={`${selectedDiv === 4 ? "tab_active" : ""}  ownedColl_tab`}
          onClick={() => handleDivClick(4)}
        >
          Pattern
        </div>
      </div> */}
      <div className="ownedColl_container_lower">
        {<CardHolder array={myArray} activeDiv={selectedDiv} />}
        {/* {selectedDiv === 1 && (
          <div>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        )}
        {selectedDiv === 2 && <div>Data for Div 2</div>}
        {selectedDiv === 3 && <div>Data for Div 3</div>}
        {selectedDiv === 4 && <div>Data for Div 4</div>} */}
      </div>
    </div>
  );
};

export default OwnedColl;
