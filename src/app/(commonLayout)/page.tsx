"use client"
import { Hero } from "@/components/home/Hero";
import { Platforms } from "@/components/home/Platforms";
import { TextCompare } from "@/components/home/TextCompare";
import { Unique } from "@/components/home/Unique";
import { WhyChoose } from "@/components/home/WhyChoose";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { Agnostic } from "@/components/home/Agnostic";
import { Packages } from "@/components/home/Packages";
import TestimonialsScroll from "@/components/home/Reviews";
import { SingleClick } from "@/components/home/SingleClick";


const App = () => {

  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const { theme } = useTheme();

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsHovering(true);
  };
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={`relative overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-following sparkling stars effect */}
      <motion.div
        className="pointer-events-none fixed z-50 top-0 left-0 w-16 h-16 flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          opacity: isHovering ? 0.32 : 0.10,
          filter: isHovering ? "blur(0.5px) brightness(1.1)" : "blur(1.5px) brightness(0.7)",
          transition: 'opacity 0.4s, filter 0.4s',
        }}
        animate={{
          scale: isHovering ? 1.1 : 0.8,
        }}
      >
        {/* Main star */}
        <motion.span
          style={{ position: 'absolute', left: '40%', top: '40%' }}
          animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <BsStars size={22} color="#B7D6EF" style={{ filter: 'drop-shadow(0 0 6px #B7D6EF88)' }} />
        </motion.span>
        {/* Small twinkle 1 */}
        <motion.span
          style={{ position: 'absolute', left: '10%', top: '60%' }}
          animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
        >
          <BsStars size={10} color="#CAA9D3" style={{ filter: 'drop-shadow(0 0 4px #CAA9D388)' }} />
        </motion.span>
        {/* Small twinkle 2 */}
        <motion.span
          style={{ position: 'absolute', left: '70%', top: '20%' }}
          animate={{ scale: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        >
          <BsStars size={8} color="#B7D6EF" style={{ filter: 'drop-shadow(0 0 3px #B7D6EF88)' }} />
        </motion.span>
        {/* Small twinkle 3 */}
        <motion.span
          style={{ position: 'absolute', left: '60%', top: '75%' }}
          animate={{ scale: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.1, delay: 0.7, ease: 'easeInOut' }}
        >
          <BsStars size={7} color="#A69CD4" style={{ filter: 'drop-shadow(0 0 2px #A69CD488)' }} />
        </motion.span>
      </motion.div>
      <Hero />
      <Platforms />
      <TextCompare />
      <WhyChoose />
      <Unique />
      <Agnostic />
      <Packages />
      <TestimonialsScroll />
      <SingleClick />
      <style jsx global>{`
        body {
          cursor: pointer;
        }
        .mouse-glow {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default App;
