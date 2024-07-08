import React, { useState } from "react";
import { uploadToPinata } from "./pinata";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [pinataURL, setPinataURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [videoName, setVideoName] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoPrice, setVideoPrice] = useState("");

  const [open, setOpen] = useState(false);

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
      const data = {
        name: videoName,
        video: `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`,
        description: videoDesc,
        price: videoPrice,
      };
      setPinataURL(data.video);
      console.log(data);
    } catch (error) {
      console.error("Failed to upload video to Pinata:", error);
    } finally {
      setIsUploading(false);
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
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
              style={{ marginTop: '20px', marginBottom: '20px', display: 'block' }}
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
              {isUploading ? 'Uploading...' : 'Upload to Pinata'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* {pinataURL && (
        <div>
          <h3>Pinata URL:</h3>
          <a href={pinataURL} target="_blank" rel="noopener noreferrer">
            {pinataURL}
          </a>
          <div>
            <p>
              <strong>Video Name:</strong> {videoName}
            </p>
            <p>
              <strong>Description:</strong> {videoDesc}
            </p>
            <p>
              <strong>Price:</strong> ${videoPrice}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default VideoUpload;
