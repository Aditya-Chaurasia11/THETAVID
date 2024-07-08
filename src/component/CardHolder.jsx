import React from "react";
import Card from "./Card";
import "./cardholder.css";

const CardHolder = ({ array, activeDiv }) => {
  return (
    <div className="cardholder_container">
      {array.map(() => (
        <Card />
      ))}
      {/* {activeDiv} */}
    </div>
  );
};

export default CardHolder;
