import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          SnapSecure
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/features" className="hover:text-blue-600">Features</Link>
          <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
          <Link to="/how-it-works" className="hover:text-blue-600">How It Works</Link>
          <Link
            to="/login"
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className="text-3xl">&#9776;</span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/features" onClick={() => setOpen(false)}>Features</Link>
          <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link to="/how-it-works" onClick={() => setOpen(false)}>How It Works</Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
