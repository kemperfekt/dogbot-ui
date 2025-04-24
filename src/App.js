// === App.js ===
import React, { useState } from "react";
import SlotMachine from "./components/SlotMachine";
import ChatUI from "./components/ChatUI";
import "./styles/ChatUI.css";

function App() {
  const [userImage, setUserImage] = useState("/assets/images/left_01.png");
  const [dogImage, setDogImage] = useState("/assets/images/right_01.png");
  const [isThinking, setIsThinking] = useState(false);

  return (
    <div>
      <div className="header-container">
        <h1>Bell-O-Mat</h1>
        <h2>Jetzt wird's hündisch.</h2>
      </div>
      <SlotMachine
        setUserImage={setUserImage}
        setDogImage={setDogImage}
        isThinking={isThinking}
      />
      <ChatUI
        userImage={userImage}
        dogImage={dogImage}
        setIsThinking={setIsThinking}
      />
    </div>
  );
}

export default App;