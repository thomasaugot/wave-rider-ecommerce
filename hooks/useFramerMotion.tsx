// This file to avoid repeating framer motion related code
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseFramerMotionProps {
  isVisible: boolean;
  variants: any;
  children: React.ReactNode;
}

export const useFramerMotion = ({
  isVisible,
  variants,
  children,
}: UseFramerMotionProps) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      isVisible = true;
    }
  }, [inView]);

  return (
    isVisible && (
      <motion.div variants={variants} initial="hidden" whileInView="show">
        {children}
      </motion.div>
    )
  );
};
