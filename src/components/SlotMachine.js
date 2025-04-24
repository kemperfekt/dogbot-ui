import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/SlotMachine.css';

const imagesLeft = [ require('../assets/images/left_01.png'), require('../assets/images/left_02.png'), require('../assets/images/left_03.png'), require('../assets/images/left_04.png'), require('../assets/images/left_05.png') ];
const imagesRight = [ require('../assets/images/right_01.png'), require('../assets/images/right_02.png'), require('../assets/images/right_03.png'), require('../assets/images/right_04.png'), require('../assets/images/right_05.png') ];

const SlotMachine = ({ side, isThinking }) => {
  const imageSet = side === 'left' ? imagesLeft : side === 'right' ? imagesRight : [];
  const [index, setIndex] = useState(0);
  const animationFrameRef = useRef(null);
  const speedRef = useRef(50); // Initialgeschwindigkeit (klein = schnell)

  // Slot-Animation mit Brems-Effekt
  useEffect(() => {
    if (!isThinking || imageSet.length === 0) return;

    let lastTime = performance.now();

    const animate = (now) => {
      const elapsed = now - lastTime;

      if (elapsed > speedRef.current) {
        lastTime = now;
        setIndex(prev => (prev + 1) % imageSet.length);

        // Bremse: Geschwindigkeit erhöhen (langsamer machen)
        speedRef.current += 25;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    speedRef.current = 100; // Reset
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isThinking, imageSet]);

  useEffect(() => {
    if (!isThinking && imageSet.length > 0) {
      const randomIndex = Math.floor(Math.random() * imageSet.length);
      setIndex(randomIndex);
    }
  }, [isThinking, imageSet]);

  if (imageSet.length === 0) return null;

  return (
    <motion.div
      className="slot-image"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img src={imageSet[index]} alt={`${side} avatar`} />
    </motion.div>
  );
};

export default SlotMachine;
