import "./App.css";
import LoginModal from "./Components/Auth/LoginModal";
import SignupModal from "./Components/Auth/SignupModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginModal />} />
          <Route exact path="/signup" element={<SignupModal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
