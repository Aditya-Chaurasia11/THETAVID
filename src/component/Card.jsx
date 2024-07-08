import React from "react";
import cardimg from "../assets/Rectangle 23.png";
import "./card.css";

const Card = () => {
  return (
    <div className="card_container">
      <img src={cardimg}></img>
      <div className="card_body">
        <div className="card_body_up">
          <p>
            <span>0x6854...45c2</span>
          </p>
          <p>Current Price</p>
        </div>
        <div className="card_body_bottom">
          <p>
            <span> Yellow Painting </span>
          </p>
          <p>0.005 ETH</p>
        </div>
      </div>
      <button className="card_gallery">Buy now</button>
    </div>
  );
};

export default Card;
