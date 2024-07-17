// import "./App.css";
import { useState, useEffect } from "react";
import dashboard_img from "../assets/homepage_img.png";
import dashboard_img2 from "../assets/homepage_img2.png";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../api/contextapi";
import { ethers } from "ethers";

function Home() {
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const navigate = useNavigate();

  const navigatehandler = () => {
    navigate("/collection");
  };

  const navigatehandlerGallery = () => {
    navigate("/gallery");
  };

  return (
    <div className="home_container">
      <div className="home_upper">
        <div className="home_container_left">
          <h1>Create, Sell & Collect Your Own Creative NFT</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            dolore ducimus maxime veniam explicabo ea quidem, et nihil deserunt
            sequi!
          </p>
          <div className="home_container_button">
            <button className="button_github" onClick={navigatehandlerGallery} >Explore now</button>
            <button className="button_claim" onClick={navigatehandler}>
              <span>Upload &#x21AA;</span>
            </button>
          </div>
        </div>
        <div className="home_container_right">
          <img src={dashboard_img}></img>
        </div>
      </div>
      <div className="home_lower">
        <div className="home_lower_left">
          <img src={dashboard_img2}></img>
        </div>
        <div className="home_lower_right">
          <h2>Design for Theta Network 2024 Hackathon</h2>
          <p>
            Theta Network is the leading blockchain-powered decentralized cloud
            for AI, media and entertainment. It can be viewed as a "dual
            network" consisting of two complementary subsystems, the Theta Edge
            Network and the Theta Blockchain. The edge network provides vast
            amounts of GPU compute power for AI, video, rendering and other
            tasks, while the Theta blockchain provides payment, reward, and
            smart contract capabilities. Below we provide more details for the
            two components.
          </p>
          <a
            href="https://docs.thetatoken.org/docs/what-is-theta-network"
            target="_blank"
          >
            <button className="home_readmore">Read more</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
