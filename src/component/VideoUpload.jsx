import React, { useState } from "react";
import { uploadToPinata } from "./pinata";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useWeb3 } from "../api/contextapi";
import { ethers } from "ethers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [pinataURL, setPinataURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoPrice, setVideoPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { account, setAccount, provider, setProvider, contract, setContract } =
    useWeb3();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!videoFile) return;

    setIsUploading(true);
    try {
      const response = await uploadToPinata(videoFile);

      const priceInWei = ethers.parseEther(videoPrice);

      const data = {
        name: videoName,
        video: `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`,
        description: videoDesc,
        price: priceInWei.toString(),
        cat: category ? category : "other",
      };
      setPinataURL(data.video);
      // console.log(data);

      if (response && contract) {
        const NFTmetaData = {
          description: videoDesc,
          external_url: "https://openseacreatures.io/3",
          image: `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`,
          name: videoName,
          price: priceInWei.toString(),
          cat: category ? category : "other",
          attributes: [
            {
              trait_type: "Base",
              value: "Starfish",
            },
          ],
        };

        const resFileMetadata = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
          data: NFTmetaData,
          headers: {
            pinata_api_key: `a6e50f62847b55509419`,
            pinata_secret_api_key: `2f89858b273342a7994d2093faa0a56480bda602b56c63b55dd81593b3de1cd7`,
            "Content-Type": "application/json",
          },
        });

        const uri = `ipfs://${resFileMetadata.data.IpfsHash}`;
        // console.log(uri);
        const temp = await contract?.createNFT(
          uri,
          priceInWei.toString(),
          `https://gateway.pinata.cloud/ipfs/${response?.IpfsHash}`,
          videoName,
          videoDesc,
          category
        );
        // console.log("NFT created", temp);
        await temp.wait();
        toast.success(`Video successfully uploaded`, {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Failed to upload video to Pinata:", error);
    } finally {
      setIsUploading(false);
    }
    handleClose();
  };

  return (
    <div>
      <ToastContainer />

      <button className="button_github" onClick={handleClickOpen}>
        Sell video
      </button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form to upload your video.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={videoDesc}
              minRows={3}
              onChange={(e) => setVideoDesc(e.target.value)}
              variant="standard"
            />
            <FormControl variant="standard" fullWidth margin="dense">
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value={"sport"}>Sport</MenuItem>
                <MenuItem value={"photography"}>Photography</MenuItem>
                <MenuItem value={"music"}>Music</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              value={videoPrice}
              onChange={(e) => setVideoPrice(e.target.value)}
              variant="standard"
            />
            <input
              required
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                display: "block",
              }}
            />
            {videoURL && (
              <div>
                <h3>Preview:</h3>
                <video width="100%" controls>
                  <source src={videoURL} type={videoFile?.type} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default VideoUpload;
