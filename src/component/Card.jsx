import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWeb3 } from "../api/contextapi";

const Card = ({ data }) => {
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${data?.tokenId}`);
  };

  return (
    <div className="card_container">
      {data.videoURL ? (
        <video width="100%" >
          <source src={data?.videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        "No video available"
      )}
      <div className="card_body">
        <div className="card_body_up">
          <p>
            <span>
              {data.sender
                ? `${data.sender.slice(0, 6)}...${data.sender.slice(
                    data.sender.length - 4,
                    data.sender.length
                  )}`
                : "NA"}
            </span>
          </p>
          <p>Current Price</p>
        </div>
        <div className="card_body_bottom">
          <p>
            <span>{data?.videoName.slice(0,18)}</span>
          </p>
          <p>{ethers.formatEther(data?.price)} TFUEL</p>
        </div>
      </div>
      <button className="card_gallery" onClick={handleClick}>
        {account !== data.sender
          ? "Buy now"
          : data.outForSale === true
          ? "Owned"
          : "Resale"}
      </button>
    </div>
  );
};

export default Card;
