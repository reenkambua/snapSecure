import React from "react";
import NavItem from "./NavItem";
import { Lock } from "lucide-react";

const Header = ({ currentPage, setCurrentPage }) => (
  <header className="bg-gray-900/95 backdrop-blur border-b border-gray-700 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

      <div className="flex items-center" onClick={() => setCurrentPage("home")}>
        <Lock className="text-green-400 w-6 h-6 mr-2" />
        <h1 className="text-xl text-green-400 font-bold">SnapSecure</h1>
      </div>

      <nav className="flex space-x-4">
        <NavItem name="Home" pageKey="home" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <NavItem name="Features" pageKey="features" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <NavItem name="How It Works" pageKey="how" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <NavItem name="Pricing" pageKey="pricing" currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </nav>

      <div className="flex space-x-2">
        <button className="border border-gray-600 px-3 py-1 rounded text-gray-300 hover:bg-gray-800">Login</button>
        <button className="bg-green-500 px-3 py-1 rounded text-gray-900 font-bold">Sign Up</button>
      </div>
    </div>
  </header>
);

export default Header;
