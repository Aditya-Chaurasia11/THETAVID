import React, { useEffect, useState } from "react";
import "./ownedColl.css";
import CardHolder from "../component/CardHolder";
import VideoUpload from "../component/VideoUpload";
import { useWeb3 } from "../api/contextapi";

const OwnedColl = () => {

  const [prodList, setProdList] = useState([]);
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const parseDataToArray = (data) => {
    const elements = data.split(",");
    const nfts = [];

    for (let i = 0; i < elements.length; i += 9) {
      const nft = {
        tokenId: elements[i],
        owner: elements[i + 1],
        sender: elements[i + 2],
        price: elements[i + 3],
        outForSale: elements[i + 4] === "true",
        videoURL: elements[i + 5],
        videoName: elements[i + 6],
        videoDescription: elements[i + 7],
        videoCategory: elements[i + 8],
      };
      nfts.push(nft);
    }
    return nfts;
  };

  const getAllNfts = async () => {
    try {
      const array = await contract?.allmynftsnotforsale();
      const arrayToString = array.toString();
      if (arrayToString) {
        const readableArray = parseDataToArray(arrayToString);
        setProdList(readableArray);
        console.log("Array of NFTs:", readableArray);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract) getAllNfts();
  }, []);

  return (
    <div className="ownedColl_container">
      <div className="ownedColl_container_upper">
        <h2>Collections</h2>
        <VideoUpload />
      </div>
      <div className="ownedColl_container_lower">
        <CardHolder array={prodList} activeDiv={"Collection"} />
      </div>
    </div>
  );
};

export default OwnedColl;
