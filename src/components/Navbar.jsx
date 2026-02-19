import React from "react";

const Navbar = () => {
  return (
    <nav className="w-screen bg-black text-white px-6 py-4 flex justify-between items-center">

      <span className="text-2xl font-bold">Note-Pad</span>

      <ul className="flex gap-6">
        <li className="hover:font-bold cursor-pointer transition-all">Home</li>
        <li className="hover:font-bold cursor-pointer transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
