import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollProgressLineProps {
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}

const ScrollProgressLine: React.FC<ScrollProgressLineProps> = ({ containerRef, className = "" }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lightTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className={`absolute top-0 bottom-0 w-[2px] bg-white/10 overflow-hidden hidden md:block ${className}`}>
      <motion.div 
        className="absolute left-0 w-full h-40 bg-gradient-to-b from-transparent via-brand-primary to-transparent"
        style={{ top: lightTop, opacity: lightOpacity }}
      />
    </div>
  );
};

export default ScrollProgressLine;
