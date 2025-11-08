import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="p-5 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-green-700">🌱 Krishi Mitra</h1>

        <ul className="flex gap-6 text-green-800 font-medium mt-2">
          <li className="hover:text-green-600 cursor-pointer">Home</li>
          <li className="hover:text-green-600 cursor-pointer">About</li>
          <li className="hover:text-green-600 cursor-pointer">Contact</li>
        </ul>

        <button className="bg-green-600 text-white px-2 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
          Start Simulation
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
