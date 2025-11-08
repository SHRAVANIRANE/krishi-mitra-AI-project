import React from "react";
import { motion } from "framer-motion"; // Make sure you ran `npm install framer-motion`

// This component receives 'onStartSimulation' as a prop from App.jsx
const Hero = ({ onStartSimulation }) => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center text-center p-6">
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
          🌿Krishi Mitra🌿
        </h1>

        <p className="text-lg md:text-xl text-green-700 font-medium max-w-2xl mx-auto leading-relaxed mt-4">
          Your Personal Crop Care Companion.
          <br />
          Use our AI simulator to detect diseases, visualize infections, and
          calculate your cost savings.
        </p>
      </motion.header>

      <motion.div
        className="mt-10 flex gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <button
          onClick={onStartSimulation} // This tells App.jsx to change the page
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-green-700 transition-transform hover:scale-105"
        >
          🌾 Start Simulation
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
