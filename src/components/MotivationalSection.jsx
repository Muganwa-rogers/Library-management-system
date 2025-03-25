import React from "react";
import { motion } from "framer-motion";

const MotivationalSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg p-6 my-4"
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      <motion.h2
        className="text-xl md:text-2xl font-bold mb-2"
        variants={textVariants}
      >
        You're Making an Impact!
      </motion.h2>
      <motion.p
        className="text-sm md:text-base leading-relaxed"
        variants={textVariants}
      >
        "Your leadership transforms challenges into opportunities. Every step
        you take today shapes a better tomorrow. Keep striving for excellence!"
      </motion.p>
    </motion.div>
  );
};

export default MotivationalSection;
