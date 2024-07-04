// this hook is to reuse the animation logic

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface UseFramerMotionProps {
  variants: any;
  children: React.ReactNode;
}

export const useFramerMotion = ({
  variants,
  children,
}: UseFramerMotionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
