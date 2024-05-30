import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Counter.scss";

interface CounterProps {
  isAnimating?: boolean;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({
  duration = 1,
  isAnimating = false,
}) => {
  const [count, setCount] = useState(0);
  const animateRef = useRef(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isAnimating && !animateRef.current) {
      animateRef.current = true;

      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount >= 1000) {
            clearInterval(intervalId);
            animateRef.current = false;
            return 1000;
          }
          return prevCount + 1;
        });
      }, duration / 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAnimating, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isAnimating ? { opacity: 1 } : {}} // Animate only if animating
      transition={{ duration: 0.5 }}
      className="counter-container"
    >
      {isAnimating && <h1>{count}</h1>}
    </motion.div>
  );
};

export default Counter;
