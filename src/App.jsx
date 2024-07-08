import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoUpload from "./component/VideoUpload";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Gallery from "./pages/Gallery";
import OwnedColl from "./pages/OwnedColl";
import VideoPage from "./pages/VideoPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/upload" element={<VideoUpload />}></Route>
          <Route path="/collection" element={<OwnedColl />}></Route>
          <Route path="/video" element={<VideoPage />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
