import React, { useRef, useEffect, useState } from "react";
import "./videoPage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoPage = () => {
  const temp =
    "https://gateway.pinata.cloud/ipfs/QmT8tWfBCAVDCWUkQTwdtEeC9YfFroG9QkHK9F5SLDCwk5";
  const videoRef = useRef(null);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 10) {
        videoElement.pause();
        videoElement.currentTime = 10;
        videoElement.controls = false;
        if (!alertShown) {
          //   alert("Buy the video to view more!");
          toast.info(`Buy the video to view more!`, {
            position: "bottom-right",
            theme:"dark",
          });
          setAlertShown(true);
        }
      }
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [alertShown]);

  return (
    <div className="videopage_container">
      <div className="videopage_left">
        <video ref={videoRef} width="100%" controls>
          <source src={temp} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="videopage_right">
        <div className="videopage_right_upper">
          <h2>Blocktones</h2>
          <p>
            Owned by <span>BlueHodl</span>
          </p>
        </div>
        <div className="videopage_right_middle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione atque
          sequi asperiores delectus at amet odio cumque. Aspernatur quas ducimus
          eos atque sunt doloribus blanditiis vero incidunt enim, ipsam aperiam.
        </div>
        <div className="videopage_right_lower">
          <div className="videopage_right_lower_price">
            <p>Current price</p>
            <h2>0.01 ETH</h2>
          </div>
          <button className="videopage_button_container">Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
