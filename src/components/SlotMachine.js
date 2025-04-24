// === SlotMachine.js ===
import React, { useEffect } from "react";
import imagesLeft from "../assets/images/leftImages";
import imagesRight from "../assets/images/rightImages";

function SlotMachine({ setUserImage, setDogImage, isThinking }) {
  useEffect(() => {
    if (!isThinking) return;

    const interval = setInterval(() => {
      const left = imagesLeft[Math.floor(Math.random() * imagesLeft.length)];
      const right = imagesRight[Math.floor(Math.random() * imagesRight.length)];
      setUserImage(left);
      setDogImage(right);
    }, 150);

    return () => clearInterval(interval);
  }, [isThinking]);

  return null;
}

export default SlotMachine;
